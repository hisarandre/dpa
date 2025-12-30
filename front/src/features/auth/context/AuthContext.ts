import { createContext } from 'react'
import type {LoginType, RegisterType} from '@/features/auth/types/auth.type'

export interface AuthContextType {
    isAuthenticated: boolean
    login: (credentials: LoginType) => Promise<void>
    register: (userData: RegisterType) => Promise<void>
    logout: () => void
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)
