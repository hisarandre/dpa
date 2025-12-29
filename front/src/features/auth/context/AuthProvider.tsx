import {authService} from "@/features/auth/services/auth.api";
import {type ReactNode, useState} from "react";
import type { LoginType, RegisterType} from "@/features/auth/types/auth.type";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = authService.getCurrentToken()
        return !!token
    })
    const [loading] = useState(false)

    const login = async (credentials: LoginType): Promise<void> => {
        await authService.login(credentials)
        setIsAuthenticated(true)
    }

    const register = async (userData: RegisterType): Promise<void> => {
        await authService.register(userData)
    }

    const logout = () => {
        authService.logout()
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

