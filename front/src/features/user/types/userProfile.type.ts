import {CategoryType} from "@/features/user/types/category.type";
import {RankType} from "@/features/user/types/rank.type";

export interface UserProfileType {
    id: number
    technicalId: string
    firstName: string
    lastName: string
    role: string
    category: CategoryType
    rank: RankType
    pronom?: string;
    birthdate?: string;
    weapon1?: string;
    weapon2?: string;
    tattoo?: string;
    height?: string;
    physic?: string;
    avatarUrl?: string;
    referenceImageUrl?: string;
    referenceUploadDate?: string;
}
