import { ArrowLeft, Camera } from "lucide-react";
import { motion, easeInOut } from "framer-motion";
import type { UserProfileType } from "@/features/profile/types/userProfile.type";
import { userCategoryStyles } from "@/styles/userCategoryStyles";
import logo from "@/assets/images/logo.svg";
import placeHolder from "@/assets/images/placeholder.png";
import {Badge} from "@/shared/components/ui/badge";
import {rankLabels} from "@/features/user/types/rank.type";
import {categoryLabels} from "@/features/user/types/category.type";

interface ProfileHeaderProps {
    user: UserProfileType;
    isEditing?: boolean;
    onBack?: () => void;
    onEditAvatar?: () => void;
}

export function ProfileHeader({ user, isEditing = false, onBack, onEditAvatar }: ProfileHeaderProps) {
    const styles = userCategoryStyles[user.category];

    return (
        <div className={`relative overflow-hidden sm:rounded-2xl px-10 py-6 ${styles.gradient}`}>

            {/* Background logo */}
            <img
                src={logo}
                alt="Background logo"
                aria-hidden
                className="h-[180%] absolute right-[-11%] top-[-60%] opacity-5 pointer-events-none select-none"
            />

            {/* Back arrow and id */}
            <div className="relative z-10 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className={`${styles.text} hover:opacity-70 transition-opacity cursor-pointer`}
                >
                    <ArrowLeft className="size-6" />
                </button>

                <p className={`text-xs font-bold font-mono`}>
                    <span className={`${styles.text}`}>#</span>{user.technicalId}
                </p>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                    className={`relative size-33 flex items-center justify-center group ${isEditing ? 'cursor-pointer' : ''}`}
                    onClick={isEditing ? onEditAvatar : undefined}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gray-dark opacity-50"
                        animate={{
                            scale: [1, 1.12, 1],
                            opacity: [0.35, 0.15, 0.35],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: easeInOut,
                        }}
                    />
                    <img
                        src={user.avatarUrl || placeHolder}
                        alt="Profile picture"
                        className="relative size-30 rounded-full border-8 border-gray-dark/75 object-cover"
                    />

                    {/* Edit mode - Overlay */}
                    {isEditing && (
                        <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="size-8 text-white" />
                        </div>
                    )}
                </div>

                <h1 className={`text-2xl font-bold ${styles.text}`}>
                    {user.firstName} {user.lastName}
                </h1>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={styles.badge}>
                        {rankLabels[user.rank]}
                    </Badge>

                    <Badge variant="outline" className={styles.badge}>
                        {categoryLabels[user.category]}
                    </Badge>
                </div>
            </div>
        </div>
    );
}