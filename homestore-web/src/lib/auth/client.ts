'use client';

import type {
  ApiProblemDetail,
  AuthUser,
  CsrfResponse,
} from '@/lib/auth/types';

const AUTH_API_ROOT = '/api/backend/v1/auth';

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class AuthApiError extends Error {
  readonly status: number;
  readonly title?: string;
  readonly fieldErrors: Record<string, string>;
  readonly requestId?: string;

  constructor(
    status: number,
    detail: string,
    options: {
      title?: string;
      fieldErrors?: Record<string, string>;
      requestId?: string;
    } = {}
  ) {
    super(detail);
    this.name = 'AuthApiError';
    this.status = status;
    this.title = options.title;
    this.fieldErrors = options.fieldErrors ?? {};
    this.requestId = options.requestId;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function readProblemDetail(
  response: Response
): Promise<ApiProblemDetail | null> {
  try {
    const payload: unknown = await response.json();

    if (!isRecord(payload)) {
      return null;
    }

    const errors = isRecord(payload.errors)
      ? Object.fromEntries(
          Object.entries(payload.errors).filter(
            (entry): entry is [string, string] => typeof entry[1] === 'string'
          )
        )
      : undefined;

    return {
      type: typeof payload.type === 'string' ? payload.type : undefined,
      title: typeof payload.title === 'string' ? payload.title : undefined,
      status: typeof payload.status === 'number' ? payload.status : undefined,
      detail: typeof payload.detail === 'string' ? payload.detail : undefined,
      instance:
        typeof payload.instance === 'string' ? payload.instance : undefined,
      errors,
      requestId:
        typeof payload.requestId === 'string' ? payload.requestId : undefined,
    };
  } catch {
    return null;
  }
}

async function toApiError(
  response: Response,
  fallbackDetail: string
): Promise<AuthApiError> {
  const problem = await readProblemDetail(response);

  return new AuthApiError(
    problem?.status ?? response.status,
    problem?.detail ?? fallbackDetail,
    {
      title: problem?.title,
      fieldErrors: problem?.errors,
      requestId: problem?.requestId,
    }
  );
}

export async function getCsrfToken(): Promise<CsrfResponse> {
  const response = await fetch(`${AUTH_API_ROOT}/csrf`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw await toApiError(
      response,
      'Không thể chuẩn bị phiên bảo mật. Vui lòng thử lại.'
    );
  }

  const payload: unknown = await response.json();

  if (
    !isRecord(payload) ||
    typeof payload.token !== 'string' ||
    typeof payload.headerName !== 'string' ||
    typeof payload.parameterName !== 'string'
  ) {
    throw new AuthApiError(
      502,
      'Phản hồi CSRF từ máy chủ không hợp lệ. Vui lòng thử lại.'
    );
  }

  return {
    token: payload.token,
    headerName: payload.headerName,
    parameterName: payload.parameterName,
  };
}

async function postJsonWithCsrf<T>(
  path: string,
  body: unknown,
  fallbackDetail: string
): Promise<T> {
  const csrf = await getCsrfToken();

  const response = await fetch(`${AUTH_API_ROOT}${path}`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [csrf.headerName]: csrf.token,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw await toApiError(response, fallbackDetail);
  }

  return (await response.json()) as T;
}

export function registerUser(input: RegisterInput): Promise<AuthUser> {
  return postJsonWithCsrf<AuthUser>(
    '/register',
    input,
    'Không thể tạo tài khoản. Vui lòng kiểm tra thông tin và thử lại.'
  );
}

export function loginUser(input: LoginInput): Promise<AuthUser> {
  return postJsonWithCsrf<AuthUser>(
    '/login',
    input,
    'Không thể đăng nhập. Vui lòng thử lại.'
  );
}

export async function logoutUser(): Promise<void> {
  const csrf = await getCsrfToken();

  const response = await fetch(`${AUTH_API_ROOT}/logout`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      [csrf.headerName]: csrf.token,
    },
  });

  if (!response.ok) {
    throw await toApiError(response, 'Không thể đăng xuất. Vui lòng thử lại.');
  }
}
