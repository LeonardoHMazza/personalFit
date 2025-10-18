import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData, AuthResponse, RegisterData } from '../interfaces/Auth';
import { Usuario } from '@/interfaces/User';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    } , []); 

    async function loadStorageData() {

        try{
            const storagedUser = await AsyncStorage.getItem('@PersonalFit:user');
            const storagedToken = await AsyncStorage.getItem('@PersonalFit:token');
    
            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }
        } catch (error) {
            console.log('Erro ao carregar dados: ', error);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email: string, password: string): Promise<AuthResponse> {
        try {
            const mockResponse = await simulateLogin(email, password);
            if (mockResponse.success && mockResponse.user && mockResponse.token) {
                await AsyncStorage.setItem('@PersonalFit:user', JSON.stringify(mockResponse.user));
                await AsyncStorage.setItem('@PersonalFit:token', mockResponse.token);

                setUser(mockResponse.user);
                return { success: true};
            } else {
                return { success: false, error: mockResponse.error };
            }
        } catch (error) {
            return { success: false, error: 'Erro ao fazer login' };
        }
    }

    async function signUp(data: RegisterData): Promise<AuthResponse> {
        try {
            const mockResponse = await simulateRegister(data);
            if (mockResponse.success) {
                return { success: true };
            } else {
                return { success: false, error: mockResponse.error };
            }
        } catch (error) {
            return { success: false, error: 'Erro ao registrar usuário' };
        }
    }

    async function signOut(): Promise<void> {
        try{
            await AsyncStorage.removeItem('@PersonalFit:user');
            await AsyncStorage.removeItem('@PersonalFit:token');
            setUser(null);
        } catch (error) {
            console.log('Erro ao deslogar: ', error);
        }
    }

    // Simulações para desenvolvimento (REMOVER EM PRODUÇÃO)
    async function simulateLogin(email: string, password: string): Promise<AuthResponse> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const users: Usuario[] = [
            {
                id: 1,
                nome: 'João Personal',
                email: 'personal@teste.com',
                cpf: '123.456.789-00',
                tipo: 'personal',
                cref: 'CREF12345'
            },
            {
                id: 2,
                nome: 'Maria Aluna',
                email: 'aluno@teste.com',
                cpf: '987.654.321-00',
                tipo: 'aluno',
                PersonalId: 1
            }
        ];

        const user = users.find(u => u.email === email);

        if (user && password === '123456'){
            return {
                success: true,
                user: user,
                token: 'mock-jwt-token-' + user.id
            };
        }

        return{ success: false, error: 'Email ou senha incorretos' };
    }

    async function simulateRegister(data: RegisterData): Promise<AuthResponse> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!data.nome || !data.email || !data.password) {
            return { success: false, error: 'Preencha todos os campos' };
        }

        if (data.password.length < 6) {
            return { success: false, error: 'A senha deve ter pelo menos 6 caracteres' };
        }

        return { success: true };
    }

    return (
        <AuthContext.Provider 
            value={{
                signed: !!user,
                user,
                loading,
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}




