import { StateCreator } from 'zustand';
import { storage } from '@/utils/storage';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  // Estado
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
  clearError: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isAuthenticated: storage.isAuthenticated(),
  user: storage.getAuth()?.user || null,
  loading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const { password: _, ...user } = data;
      
      // Guardar en localStorage con expiración
      storage.setAuth({
        user,
        token: 'session_token' // En este caso usamos un token simple
      });
      
      set({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión', 
        loading: false 
      });
    }
  },
  
  logout: () => {
    storage.clearAuth();
    set({ isAuthenticated: false, user: null });
  },
  
  checkAuthStatus: () => {
    const authData = storage.getAuth();
    
    if (authData) {
      set({ isAuthenticated: true, user: authData.user });
    } else {
      set({ isAuthenticated: false, user: null });
    }
  },
  
  clearError: () => set({ error: null })
});