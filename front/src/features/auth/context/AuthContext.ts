import { createContext } from 'react'
import type {AuthContextType} from '@/features/auth/types/auth.type'

export const AuthContext = createContext<AuthContextType | null>(null)
