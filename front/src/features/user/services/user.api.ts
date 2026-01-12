import type { UserType } from '../types/user.type'
import type {UserProfileType} from "@/features/profile/types/userProfile.type";
import api from "@/shared/lib/api";
import type {Profile} from "@/features/profile/schemas/userProfile.schema";
import type {UserContactType} from "@/features/contacts/types/userContact.type";
import type {ContactFilterKey} from "@/features/contacts/constants/ContactCategory";


class UserApi {
    async getMe(): Promise<UserType> {
        const response = await api.get<UserType>('/users/me')
        return response.data
    }

    async getProfile(): Promise<UserProfileType> {
        const response = await api.get<UserProfileType>('/users/me/profile')
        return response.data
    }

    async getProfileById(id: string): Promise<UserProfileType> {
        const response = await api.get<UserProfileType>(`/users/${id}/profile`)
        return response.data
    }

    async updateAvatar(url: string): Promise<UserProfileType> {
        const response = await api.patch<UserProfileType>('/users/me/avatar', { url })
        return response.data
    }

    async updateProfile(profile: Partial<Profile>): Promise<UserProfileType> {
        const response = await api.patch<UserProfileType>('/users/me/profile', profile)
        return response.data
    }

    async updateReference(url: string): Promise<UserProfileType> {
        const response = await api.patch<UserProfileType>('/users/me/reference', { url })
        return response.data
    }

    async updateTag(url: string): Promise<UserProfileType> {
        const response = await api.patch<UserProfileType>('/users/me/tag', { url })
        return response.data
    }

    async getContacts(filter: ContactFilterKey = 'FAVORITES', search?: string): Promise<UserContactType[]> {
        const params = new URLSearchParams()
        params.append('filter', filter)
        if (search) params.append('search', search)

        const response = await api.get<UserContactType[]>(`/users/list?${params.toString()}`)
        return response.data
    }

    async toggleFavorite(userId: number): Promise<void> {
        await api.patch(`/users/${userId}/favorite`)
    }
}

export const userApi = new UserApi()