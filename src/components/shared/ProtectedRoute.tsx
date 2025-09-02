'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { storage } from '@/utils/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, checkAuthStatus } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Verificar el estado de autenticación
    if (!storage.isAuthenticated()) {
      router.replace('/login');
    }
    checkAuthStatus();
  }, [checkAuthStatus, router]);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido protegido
  return isAuthenticated ? <>{children}</> : null;
}