export interface LoginType {
    username: string
    password: string
}

export interface RegisterType {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    token: string
    refreshToken: string
    isActive: boolean
}

export interface AuthContextType {
    isAuthenticated: boolean
    login: (credentials: LoginType) => Promise<void>
    register: (userData: RegisterType) => Promise<void>
    logout: () => void
    loading: boolean
}