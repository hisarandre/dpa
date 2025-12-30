import { useState, useEffect } from 'react'
import { UserProfileType } from '../types/userProfile.type'
import { userApi } from '../services/user.api'
import { useUser } from './useUser'
import { AxiosError } from 'axios'

interface UseProfileReturn {
    profile: UserProfileType | null
    loading: boolean
    uploadProgress: number
    error: string | null
    updateProfile: (data: Partial<UserProfileType>) => Promise<UserProfileType>
    uploadImage: (file: File, type: ImageType) => Promise<string>
    refetch: () => Promise<void>
}

export function useProfile(): UseProfileReturn {
    const { user } = useUser()
    const [profile, setProfile] = useState<UserProfileType | null>(null)
    const [loading, setLoading] = useState(true)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (user) {
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

    const updateProfile = async (data: Partial<UserProfileType>): Promise<UserProfileType> => {
        try {
            setError(null)
            const updated = await userApi.updateProfile(data)
            setProfile(updated)
            return updated
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

/*
    const uploadImage = async (file: File, type: ImageType): Promise<string> => {
        if (!user?.id) {
            throw new Error('Utilisateur non connecté')
        }

        try {
            setUploadProgress(10)
            setError(null)

            const imageUrl = await imageService.uploadImage(file, user.id, type)
            setUploadProgress(70)

            if (profile) {
                const fieldName =
                    type === 'avatar'
                        ? 'avatarUrl'
                        : type === 'reference'
                            ? 'referenceImageUrl'
                            : 'bannerUrl'

                const updatedProfile = {
                    ...profile,
                    [fieldName]: imageUrl,
                }
                await updateProfile(updatedProfile)
            }

            setUploadProgress(100)
            return imageUrl
        } catch (err) {
            console.error('Erreur lors de l\'upload:', err)
            setError('Impossible d\'uploader l\'image')
            throw err
        } finally {
            setTimeout(() => setUploadProgress(0), 1000)
        }
    }
*/

    return {
        profile,
        loading,
        uploadProgress,
        error,
        updateProfile,
        //uploadImage,
        refetch: fetchProfile,
    }
}