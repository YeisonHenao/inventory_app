'use client';

import Link from 'next/link';
import { useRegisterComposable } from './useRegisterComposable';

export default function RegisterPage() {
  const {
    name,
    email,
    password,
    confirmPassword,
    error,
    isSubmitting,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  } = useRegisterComposable();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear una cuenta</h1>
          
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}