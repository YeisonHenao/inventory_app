// Store principal que combina todos los stores
import { create } from 'zustand';
import { createAuthSlice, AuthState } from './slices/authSlice';

// Definición del tipo para el store global
export interface StoreState extends AuthState {
  // Aquí se pueden agregar más estados globales según sea necesario
}

// Creación del store global combinando todos los slices
export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  // Aquí se pueden agregar más slices según sea necesario
}));