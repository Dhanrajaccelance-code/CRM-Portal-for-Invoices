import type { ApiError } from "../types";

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  setToken(token: string | null): void {
    this.token = token;

    if (typeof window === "undefined") return;

    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restConfig } = config;

    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    };

    if (requiresAuth && this.token) {
      defaultHeaders["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...restConfig,
        headers: defaultHeaders,
      });

      // --- Unauthorized Handling ---
      if (response.status === 401) {
        this.setToken(null);

        if (requiresAuth && typeof window !== "undefined") {
          const current = window.location.pathname;
          if (current !== "/login") {
            window.location.href = "/login";
          }
        }

        throw {
          message: "Unauthorized",
          status: 401,
        } as ApiError;
      }

      // --- Handle non-OK responses ---
      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch (e) {
          // Not JSON → Ignore
        }

        const error: ApiError = {
          message: errorData?.message || "An error occurred",
          status: response.status,
          errors: errorData?.errors,
        };

        throw error;
      }

      // --- No content ---
      if (response.status === 204) {
        return {} as T;
      }

      // --- Valid JSON response ---
      return await response.json();
    } catch (error) {
      const err = error as ApiError;
      if (err.status !== undefined) throw err;

      throw {
        message: "Network error. Please check your connection.",
        status: 0,
      } as ApiError;
    }
  }

  // REST Methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = new ApiService(API_BASE_URL);
