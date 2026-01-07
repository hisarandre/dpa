import { useState, useEffect } from 'react'
import type {UserProfileType} from '../../user/types/userProfile.type'
import { userApi } from '../../user/services/user.api'
import { useUser } from '../../user/hooks/useUser'
import { AxiosError } from 'axios'
import type {Profile} from "@/features/profile/schemas/userProfile.schema";

interface UseProfileReturn {
    profile: UserProfileType | null
    loading: boolean
    error: string | null
    updateAvatar: (avatarUrl : string) => Promise<void>
    updateReference: (referenceUrl : string) => Promise<void>
    updateTag: (tagUrl : string) => Promise<void>
    updateProfile: (profileInfos : Partial<Profile>) => Promise<void>
    refetch: () => Promise<void>
}

export function useProfile(): UseProfileReturn {
    const { user, updateUser } = useUser()

    const [profile, setProfile] = useState<UserProfileType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (user && !profile) {
            fetchProfile()
        }
    }, [user])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await userApi.getProfile()
            setProfile(data)
        } catch (err) {
            console.error('Erreur lors de la récupération du profil:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de charger le profil')
            } else {
                setError('Impossible de charger le profil')
            }
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (data: Partial<Profile>): Promise<void> => {
        try {
            setError(null)
            const updated = await userApi.updateProfile(data)
            setProfile(updated)
            updateUser({
                firstName: updated.firstName,
                lastName: updated.lastName,
            })
            } catch (err) {
            console.error('Erreur lors de la mise à jour:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de mettre à jour le profil')
            } else {
                setError('Impossible de mettre à jour le profil')
            }
            throw err
        }
    }

    const updateAvatar = async (avatarUrl: string): Promise<void> => {
        try {
            setError(null)
            const updated = await userApi.updateAvatar(avatarUrl)
            setProfile(updated)
            updateUser({avatarUrl: updated.avatarUrl})
        } catch (err) {
            console.error('Erreur lors de la mise à jour de l\'avatar:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de mettre à jour l\'avatar')
            } else {
                setError('Impossible de mettre à jour l\'avatar')
            }
            throw err;
        }
    }

    const updateReference = async (referenceUrl: string): Promise<void> => {
        try {
            setError(null)
            const updated = await userApi.updateReference(referenceUrl)
            setProfile(updated)
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la référence:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de mettre à jour la référence')
            } else {
                setError('Impossible de mettre à jour la référence')
            }
            throw err;
        }
    }

    const updateTag = async (tagUrl: string): Promise<void> => {
        try {
            setError(null)
            const updated = await userApi.updateTag(tagUrl)
            setProfile(updated)
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la référence:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de mettre à jour la référence')
            } else {
                setError('Impossible de mettre à jour la référence')
            }
            throw err;
        }
    }

    return {
        profile,
        loading,
        error,
        updateAvatar,
        updateReference,
        updateTag,
        updateProfile,
        refetch: fetchProfile,
    }
}