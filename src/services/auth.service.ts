import { supabase } from './supabase';
import {
  User,
  LoginCredentials,
  TwoFactorVerification,
  LoginResult,
  Verify2FAResponse,
  ApiError,
} from '../types';
import { api } from './api';

interface LoginPayloadShape {
  requires2FA?: boolean;
  requiresTwoFactor?: boolean;
  userId?: string;
  user_id?: string;
  accessToken?: string;
  token?: string;
  user?: User;
  message?: string;
  msg?: string;
  detail?: string;
  description?: string;
}

type RawLoginResponse = LoginPayloadShape & { data?: LoginPayloadShape };

interface RawVerifyResponse {
  accessToken?: string;
  token?: string;
  user?: User;
  data?: {
    accessToken?: string;
    token?: string;
    user?: User;
  };
}

interface NormalisedLoginData {
  requires2FA?: boolean;
  userId?: string;
  accessToken?: string;
  user?: User;
  message?: string;
}

const normaliseLoginResponse = (payload: RawLoginResponse): NormalisedLoginData => {
  const merged = { ...payload, ...(payload.data ?? {}) };
  return {
    requires2FA: merged.requires2FA ?? merged.requiresTwoFactor,
    userId: merged.userId ?? merged.user_id,
    accessToken: merged.accessToken ?? merged.token,
    user: merged.user,
    message: merged.message ?? merged.msg ?? merged.description ?? merged.detail,
  };
};

const normaliseVerifyResponse = (payload: RawVerifyResponse): Verify2FAResponse => {
  const merged = { ...payload, ...(payload.data ?? {}) };
  const accessToken = merged.accessToken ?? merged.token;
  const { user } = merged;

  if (!accessToken || !user) {
    throw new Error('Verification response missing authentication details.');
  }

  return {
    accessToken,
    user,
  };
};

const fetchSupabaseUser = async (): Promise<User | null> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return userData as User;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    const response = await api.post<RawLoginResponse>(
      '/users/login',
      credentials,
      { requiresAuth: false }
    );

    const {
      requires2FA,
      userId,
      accessToken,
      user,
      message,
    } = normaliseLoginResponse(response);

    const requiresTwoFactor =
      requires2FA === true ||
      (!!message && /verification code/i.test(message));

    if (requiresTwoFactor) {
      return {
        requires2FA: true,
        userId: userId ?? credentials.email,
        message,
      };
    }

    if (!accessToken || !user) {
      throw new Error('Login response missing authentication details.');
    }

    api.setToken(accessToken);

    return {
      requires2FA: false,
      user,
      message,
    };
  },

  async verify2FA(verification: TwoFactorVerification): Promise<Verify2FAResponse> {
    const response = await api.post<RawVerifyResponse>(
      '/users/login/verify',
      {
        email: verification.userId,
        code: verification.code,
      },
      { requiresAuth: false }
    );

    const normalised = normaliseVerifyResponse(response);

    api.setToken(normalised.accessToken);

    return normalised;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    if (!api.getToken()) {
      try {
        return await fetchSupabaseUser();
      } catch {
        return null;
      }
    }

    try {
      return await api.get<User>('/users/me');
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        return null;
      }

      const apiError = error as ApiError;
      if (apiError?.status && apiError.status !== 404) {
        throw error;
      }

      try {
        return await fetchSupabaseUser();
      } catch {
        return null;
      }
    }
  },

  async generateOTP(userId: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { error } = await supabase.from('two_factor_codes').insert({
      user_id: userId,
      code,
      expires_at: expiresAt.toISOString(),
      is_used: false,
    });

    if (error) throw error;

    return code;
  },
};
