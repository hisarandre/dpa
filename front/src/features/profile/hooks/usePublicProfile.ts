import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import type { UserProfileType } from "../types/userProfile.type"
import { userApi } from "@/features/user/services/user.api"

export function usePublicProfile(userId?: string) {
    const [profile, setProfile] = useState<UserProfileType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        fetchProfile(userId)
    }, [userId])

    const fetchProfile = async (id: string) => {
        try {
            setLoading(true)
            setError(null)
            const data = await userApi.getProfileById(id)
            setProfile(data)
        } catch (err) {
            console.error("Erreur chargement profil public:", err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || "Impossible de charger le profil")
            } else {
                setError("Impossible de charger le profil")
            }
        } finally {
            setLoading(false)
        }
    }

    return { profile, loading, error, refetch: () => userId && fetchProfile(userId) }
}
