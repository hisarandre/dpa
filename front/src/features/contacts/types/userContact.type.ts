import {CategoryType} from "@/features/user/types/category.type";
import {RankType} from "@/features/user/types/rank.type";

export interface UserContactType {
    id: number
    technicalId: string
    username: string
    firstName?: string
    lastName?: string
    role: string
    category: CategoryType
    rank: RankType
    avatarUrl?: string
    favorite: boolean
}