import { useState, useEffect } from "react";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileTabs } from "@/features/profile/components/ProfileTabs";
import { GeneralTab } from "@/features/profile/components/GeneralTab";
import { PhysiqueTab } from "@/features/profile/components/PhysiqueTab";
import {Save, X, Edit, Loader2, AlertCircle} from "lucide-react";
import { Button } from '@/shared/components/ui/button'
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { useProfile } from "@/features/user/hooks/useProfile";
import {userCategoryStyles} from "@/shared/lib/userCategoryStyles";
import type {UserProfileType} from "@/features/user/types/userProfile.type";


interface ProfileViewProps {
    profile: UserProfileType;
}


export default function ProfileViewPage({
                                            profile,
                                        }: ProfileViewProps) {


    const [activeTab, setActiveTab] = useState<"general" | "physique">("general");
    const styles = userCategoryStyles[profile.category];


    return (

        <div className="mt-6 sm:max-w-4xl sm:mx-auto bg-card rounded-xl border">
            {/* Name */}
            <h1 className={`text-2xl font-bold tracking-wide ${styles.text}`}>
                {profile.firstName} {profile.lastName}
            </h1>

            {/* Code */}
            <span className={`text-xs font-mono tracking-widest ${styles.hint}`}>
                    #{profile.technicalId}
                    </span>
        </div>
    );
}
