/* eslint-disable @typescript-eslint/no-unused-vars */
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
        // Manejar diferentes códigos de error
        switch (response.status) {
          case 404:
            throw new Error('Usuario no encontrado');
          case 401:
            throw new Error('Contraseña incorrecta');
          default:
            throw new Error(data.message || 'Error al iniciar sesión');
        }
      }

      // Asegurarnos de que data tiene la estructura correcta
      if (!data.id || !data.email) {
        throw new Error('Respuesta del servidor inválida');
      }

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.name || ''
      };
      
      // Guardar en localStorage con expiración
      storage.setAuth({
        user,
        token: 'session_token'
      });
      
      set({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      console.error('Error en login:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión', 
        loading: false 
      });
      throw error; // Re-lanzar el error para manejarlo en el componente
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