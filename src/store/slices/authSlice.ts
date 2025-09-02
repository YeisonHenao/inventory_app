import { StateCreator } from 'zustand';

// Definición del tipo para el estado de autenticación
export interface AuthState {
  // Estado
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

// Tipo para el usuario
export interface User {
  id: string;
  email: string;
  name?: string;
  // Puedes agregar más propiedades según necesites
}

// Creación del slice de autenticación
export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  // Estado inicial
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  
  // Acciones
  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      // Simulación de una llamada a API (reemplazar con tu lógica real de autenticación)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulación de respuesta exitosa
      // En un caso real, aquí harías una llamada a tu API de autenticación
      if (email === 'usuario@ejemplo.com' && password === 'password') {
        const user = {
          id: '1',
          email,
          name: 'Usuario Ejemplo'
        };
        
        // Guardar token en localStorage para persistencia
        localStorage.setItem('auth_token', 'token_simulado');
        localStorage.setItem('user', JSON.stringify(user));
        
        set({ isAuthenticated: true, user, loading: false });
      } else {
        set({ error: 'Credenciales inválidas', loading: false });
      }
    } catch (error) {
      set({ error: 'Error al iniciar sesión', loading: false });
    }
  },
  
  logout: () => {
    // Eliminar datos de autenticación del localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    set({ isAuthenticated: false, user: null });
  },
  
  checkAuthStatus: async () => {
    try {
      set({ loading: true });
      
      // Verificar si hay un token en localStorage
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        // Si hay un token, considerar al usuario como autenticado
        const user = JSON.parse(userStr) as User;
        set({ isAuthenticated: true, user, loading: false });
      } else {
        set({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null, loading: false });
    }
  },
  
  clearError: () => set({ error: null })
});