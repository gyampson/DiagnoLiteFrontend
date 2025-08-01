import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'health_worker' | 'supervisor';
  facility?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'health_worker' | 'supervisor';
    facility?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

type AuthContextType = AuthState & AuthActions;

const AUTH_STORAGE_KEY = '@diagno_lite_auth';

export const [AuthProvider, useAuth] = createContextHook<AuthContextType>(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = user !== null;

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const userData = JSON.parse(storedAuth);
        setUser(userData);
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - replace with real authentication logic
      if (email && password.length >= 6) {
        const userData: User = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          role: 'health_worker',
          facility: 'Rural Health Center'
        };
        
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'health_worker' | 'supervisor';
    facility?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (userData.email && userData.password.length >= 6 && userData.name) {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
          facility: userData.facility
        };
        
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return { success: true };
      } else {
        return { success: false, error: 'Please fill all required fields' };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuthStatus
  };
});