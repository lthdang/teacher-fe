import { apiClient } from './client';

export interface UserDTO {
  id: string;
  email: string;
  full_name?: string;
  fullName?: string;
  phone?: string;
  status?: 'Active' | 'Inactive' | 'Blocked' | 'Pending' | string;
  last_login_at?: string;
  lastLoginAt?: string;
  created_at?: string;
  createdAt?: string;
  update_at?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  token_type?: string;
  expires_at?: string;
  user: UserDTO;
}

/**
 * Authenticate user with email and password.
 * Backend endpoints: POST /user/login or POST /user/sign-in
 */
export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/user/login', credentials);
  return response.data;
}

/**
 * Register / Create a new user.
 * Backend endpoints: POST /user (CreateUserRequest) or POST /user/sign-in
 */
export async function signUpApi(data: SignUpData): Promise<UserDTO> {
  try {
    const response = await apiClient.post<UserDTO>('/user', {
      email: data.email,
      password: data.password,
      full_name: data.full_name,
      fullName: data.full_name,
      phone: data.phone || '',
    });
    return response.data;
  } catch (err: any) {
    // If /user returned 404 or method not allowed, try /user/sign-in as alternative
    if (err.response?.status === 404 || err.response?.status === 405) {
      const response = await apiClient.post<any>('/user/sign-in', {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        fullName: data.full_name,
        phone: data.phone || '',
      });
      return response.data?.user || response.data;
    }
    throw err;
  }
}

/**
 * Log out user.
 * Backend endpoint: POST /user/logout
 */
export async function logoutApi(): Promise<void> {
  try {
    await apiClient.post('/user/logout');
  } catch (error) {
    // Logout error should not block client-side session cleanup
    console.warn('Backend logout notification failed:', error);
  }
}

/**
 * Retrieve user details by ID.
 * Backend endpoint: GET /user/{userId}
 */
export async function getUserByIdApi(userId: string): Promise<UserDTO> {
  const response = await apiClient.get<UserDTO>(`/user/${userId}`);
  return response.data;
}
