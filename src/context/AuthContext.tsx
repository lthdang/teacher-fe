import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserDTO,
  LoginCredentials,
  SignUpData,
  loginApi,
  signUpApi,
  logoutApi,
  getUserByIdApi,
} from '../api/authApi';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../api/client';

export interface AuthContextType {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<UserDTO>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<UserDTO | null>(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state to localStorage
  const persistSession = (newToken: string | null, newUser: UserDTO | null) => {
    setToken(newToken);
    setUser(newUser);
    if (newToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const refreshUser = useCallback(async () => {
    if (!token || !user?.id) return;
    try {
      const updatedUser = await getUserByIdApi(user.id);
      persistSession(token, updatedUser);
    } catch (err) {
      console.warn('Failed to refresh user profile from server:', err);
    }
  }, [token, user?.id]);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      const savedUserStr = localStorage.getItem(USER_STORAGE_KEY);

      if (savedToken && savedUserStr) {
        try {
          const parsedUser = JSON.parse(savedUserStr);
          setUser(parsedUser);
          setToken(savedToken);

          // Optionally fetch latest profile in background
          if (parsedUser.id) {
            getUserByIdApi(parsedUser.id)
              .then((freshUser) => {
                setUser(freshUser);
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(freshUser));
              })
              .catch(() => {
                // If token invalid, keep cached user or allow user to browse
              });
          }
        } catch {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await loginApi(credentials);
      persistSession(res.token, res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<UserDTO> => {
    setIsLoading(true);
    try {
      const created = await signUpApi(data);
      return created;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
    } finally {
      persistSession(null, null);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    signUp,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
