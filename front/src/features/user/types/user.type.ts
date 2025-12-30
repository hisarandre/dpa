import {CategoryType} from "@/features/user/types/category.type";
import {RankType} from "@/features/user/types/rank.type";

export interface UserType {
    id: number
    technicalId: string
    username: string
    email: string
    firstName: string
    lastName: string
    role: string
    isActive: boolean
    category: CategoryType
    rank: RankType
    currentMoney: number
}