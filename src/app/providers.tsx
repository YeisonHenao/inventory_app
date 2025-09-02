'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { checkAuthStatus } = useStore();

  // Verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return <>{children}</>;
}