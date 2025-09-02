import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

export const useLoginComposable = () => {
    // Estados locales para el formulario
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    // Obtener estados y acciones del store global
    const { login, isAuthenticated, error, loading, clearError } = useStore();
    
    // Router para redirecciones
    const router = useRouter();
    
    // Efecto para redireccionar si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);
    
    // Manejar cambios en los campos del formulario
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        clearError(); // Limpiar errores al cambiar el input
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        clearError(); // Limpiar errores al cambiar el input
    };
    
    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    };
    
    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email || !password) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await login(email, password);
            // Si el login es exitoso, la redirección se maneja en el useEffect
        } catch (error) {
            console.error('Error en el login:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return {
        // Estados
        email,
        password,
        rememberMe,
        isSubmitting,
        error,
        loading,
        
        // Manejadores
        handleEmailChange,
        handlePasswordChange,
        handleRememberMeChange,
        handleSubmit,
        clearError
    };
};
