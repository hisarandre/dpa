import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import type {UserType} from "@/features/user/types/user.type";

export interface UserContextType {
    user: UserType | null
    loading: boolean
    refreshUser: () => Promise<void>
    updateUser: (data: Partial<UserType>) => void
}

export function useUser(): UserContextType {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within UserProvider')
    }
    return context
}