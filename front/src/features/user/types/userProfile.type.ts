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

    // general infos
    pronoun?: string;
    birthdate?: string;
    nationality?: string;
    job?: string;

    // body infos
    tattoo?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
    hairColors?: string[];
    skinTone?: string;

    // weapon infos
    accessories?: string;
    weapon1?: string;
    weapon2?: string;

    // images
    avatarUrl?: string;
    referenceImageUrl?: string;
    referenceUploadDate?: string;
    tagUrl?: string;
}
