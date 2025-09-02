'use client';

import { useStore } from '@/store';

export default function DashboardPage() {
  const { user, logout } = useStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        
        <div className="mt-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Información del usuario</h2>
            {user ? (
              <div>
                <p><span className="font-medium">ID:</span> {user.id}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                {user.name && <p><span className="font-medium">Nombre:</span> {user.name}</p>}
              </div>
            ) : (
              <p>No hay información de usuario disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}