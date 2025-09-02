'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, checkAuthStatus } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Verificar el estado de autenticación al cargar el componente
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

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