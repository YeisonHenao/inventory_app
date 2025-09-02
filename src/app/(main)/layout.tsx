'use client';

import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Aquí puedes agregar componentes de navegación, sidebar, etc. */}
        <main className="p-4">{children}</main>
      </div>
    </ProtectedRoute>
  );
}