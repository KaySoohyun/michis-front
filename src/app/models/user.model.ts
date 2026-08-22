export interface User {
  id: string;
  email: string;
  displayName: string | null;
  coinBalance: number;
  avatarUrl: string | null;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string | null;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}
