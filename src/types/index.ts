export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  userType?: string;
  roles?: Array<{ id: number; name: string }>;
  two_factor_enabled?: boolean;
  created_at?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requires2FA: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFactorVerification {
  code: string;
  userId: string;
}

export type LoginResult =
  | { requires2FA: true; userId: string; message?: string }
  | { requires2FA: false; user: User; message?: string };

export interface Verify2FAResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface CompanyProperty {
  id?: number;
  name: string;
  status?: string;
  value?: number;
  address?: string;
}

export interface Company {
  id?: number;
  name: string;
  companyNumber: string;
  incorporationDate: string;
  sicCode: string;
  natureOfBusiness: string;
  registeredAddress: string;
  directors: string;
  shareholding: string;
  confirmationStatementDue: string;
  accountsDue: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  companyType?: string;
  totalProperties?: number;
  activeProperties?: number;
  portfolioValue?: number;
  properties?: CompanyProperty[];
}

export interface CreateCompanyPayload {
  name: string;
  companyNumber: string;
  incorporationDate: string;
  sicCode: string;
  natureOfBusiness: string;
  registeredAddress: string;
  directors: string;
  shareholding: string;
  confirmationStatementDue: string;
  accountsDue: string;
}

export interface UpdateCompanyPayload extends CreateCompanyPayload {}
