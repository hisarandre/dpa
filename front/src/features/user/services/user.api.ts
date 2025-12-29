import type { UserType } from '../types/user.type'
import api from "@/shared/lib/api";

class UserApi {
    async getMe(): Promise<UserType> {
        const response = await api.get<UserType>('/users/me')
        return response.data
    }
}

export const userApi = new UserApi()