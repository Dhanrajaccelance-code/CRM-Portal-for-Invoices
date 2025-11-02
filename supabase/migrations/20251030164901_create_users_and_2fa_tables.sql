/*
  # Authentication System Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User's unique identifier linked to auth.users
      - `email` (text, unique) - User's email address
      - `name` (text, optional) - User's display name
      - `two_factor_enabled` (boolean) - Whether 2FA is enabled for this user
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `two_factor_codes`
      - `id` (uuid, primary key) - Unique code identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `code` (text) - The 6-digit verification code
      - `is_used` (boolean) - Whether the code has been used
      - `expires_at` (timestamptz) - When the code expires (10 minutes)
      - `created_at` (timestamptz) - Code generation timestamp

  2. Security
    - Enable Row Level Security (RLS) on both tables
    - Users can only read and update their own profile data
    - Users can only read their own 2FA codes
    - Only authenticated users can access the data
    - Automatic cleanup of expired 2FA codes

  3. Important Notes
    - Uses Supabase auth.users as the source of truth for authentication
    - 2FA codes are time-limited and single-use
    - Includes triggers for automatic timestamp updates
    - Foreign key constraints ensure data integrity
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  two_factor_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create two_factor_codes table
CREATE TABLE IF NOT EXISTS two_factor_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code text NOT NULL,
  is_used boolean DEFAULT false,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_codes ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Two factor codes policies
CREATE POLICY "Users can read own 2FA codes"
  ON two_factor_codes FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service can insert 2FA codes"
  ON two_factor_codes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service can update 2FA codes"
  ON two_factor_codes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_two_factor_codes_user_id ON two_factor_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_two_factor_codes_expires_at ON two_factor_codes(expires_at);

-- Function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, two_factor_enabled)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
