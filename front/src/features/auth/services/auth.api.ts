import type {LoginResponse, LoginType, RegisterType} from '@/features/auth/types/auth.type'
import api from "@/shared/lib/api";

class AuthApi {
    async login(credentials: LoginType): Promise<void> {
        const response = await api.post<LoginResponse>('/auth/login', credentials)
        const { token, refreshToken, isActive } = response.data

        if (!isActive) {
            throw new Error('Votre compte est inactif. Veuillez contacter le support.')
        }

        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
    }

    async register(userData: RegisterType): Promise<void> {
        await api.post('/auth/register', userData)
    }

    logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }

    getCurrentToken(): string | null {
        return localStorage.getItem('token')
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken')
    }

    async refreshToken(): Promise<string> {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
            throw new Error('No refresh token available')
        }

        const response = await api.post<LoginResponse>('/auth/refresh', { refreshToken })
        const { token, refreshToken: newRefreshToken } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', newRefreshToken)

        return token
    }
}

export const authService = new AuthApi()