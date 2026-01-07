// features/user/context/UserProvider.tsx
import { useState, useEffect, type ReactNode } from 'react'
import { userApi } from '@/features/user/services/user.api'
import { UserContext } from './UserContext'
import type {UserType} from "@/features/user/types/user.type";
import {useAuth} from "@/features/auth/hooks/useAuth";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const loadUser = async () => {
            if (!isAuthenticated) {
                setUser(null)
                return
            }

            try {
                setLoading(true)
                const userData = await userApi.getMe()
                setUser(userData)
            } catch (error) {
                console.error('Failed to load user data:', error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [isAuthenticated])

    const refreshUser = async () => {
        try {
            setLoading(true)
            const userData = await userApi.getMe()
            setUser(userData)
        } catch (error) {
            console.error('Failed to refresh user:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateUser = (data: Partial<UserType>) => {
        setUser(prev =>
            prev ? { ...prev, ...data } : prev
        )
    }

    return (
        <UserContext.Provider value={{ user, loading, refreshUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}