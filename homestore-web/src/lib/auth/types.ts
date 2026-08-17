export type AuthRole = 'CUSTOMER' | 'ADMIN';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: AuthRole;
}

export interface CsrfResponse {
  token: string;
  parameterName: string;
  headerName: string;
}

export interface ApiProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string>;
  requestId?: string;
}
