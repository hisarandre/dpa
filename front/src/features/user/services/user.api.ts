import type { UserType } from '../types/user.type'
import type {UserProfileType} from "@/features/user/types/userProfile.type";
import api from "@/shared/lib/api";
import type {Profile} from "@/features/profile/schemas/userProfile.schema";

class UserApi {
    async getMe(): Promise<UserType> {
        const response = await api.get<UserType>('/users/me')
        return response.data
    }

    async getProfile(): Promise<UserProfileType> {
        const response = await api.get<UserProfileType>('/users/me/profile')
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
}

export const userApi = new UserApi()