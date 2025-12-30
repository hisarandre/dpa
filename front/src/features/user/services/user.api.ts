import type { UserType } from '../types/user.type'
import { UserProfileType } from "@/features/user/types/userProfile.type";
import api from "@/shared/lib/api";

class UserApi {
    async getMe(): Promise<UserType> {
        const response = await api.get<UserType>('/users/me')
        return response.data
    }

    async getProfile(): Promise<UserProfileType> {
        const response = await api.get<UserProfileType>('/users/me/profile')
        return response.data
    }

    async updateProfile(profile: Partial<UserProfileType>): Promise<UserProfileType> {
        const response = await api.put<UserProfileType>('/users/me/profile', profile)
        return response.data
    }
}

export const userApi = new UserApi()