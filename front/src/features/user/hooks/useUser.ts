import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import type {UserContextType} from "@/features/user/types/user.type";

export function useUser(): UserContextType {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within UserProvider')
    }
    return context
}