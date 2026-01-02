import { ArrowLeft, Edit, Camera } from "lucide-react";
import { motion, easeInOut } from "framer-motion";
import type { UserProfileType } from "@/features/user/types/userProfile.type";
import { userCategoryStyles } from "@/shared/lib/userCategoryStyles";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/shared/components/ui/button";

interface ProfileHeaderProps {
    profile: UserProfileType;
    isEditing?: boolean;
    onSwitchMode: () => void;
    onBack?: () => void;
    onEditAvatar?: () => void;
}

const pulseAnimation = {
    animate: {
        scale: [1, 1.12, 1],
        opacity: [0.35, 0.15, 0.35],
    },
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut,
    },
};

export function ProfileHeader({
                                  profile,
                                  isEditing = false,
                                  onSwitchMode,
                                  onBack,
                                  onEditAvatar,
                              }: ProfileHeaderProps) {
    const styles = userCategoryStyles[profile.category];

    return (
        <div
            className={`
        relative overflow-hidden
        flex items-center justify-center
        sm:rounded-2xl
        px-10 py-5
        ${styles.gradient}
      `}
        >
            {/* Background logo */}
            <img
                src={logo}
                alt=""
                aria-hidden
                className="
          pointer-events-none
          absolute right-[-15%] top-1/2
          h-[180%]
          -translate-y-1/2
          opacity-5
          select-none
        "
            />

            {/* ⬅️ Back */}
            {onBack && (
                <div className="absolute top-6 left-6 z-20">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={onBack}
                        className="text-white/80 hover:text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </div>
            )}

            {/* ✏️ Edit */}
            {!isEditing && (
                <div className="absolute top-6 right-6 z-20">
                    <Button
                        variant="ghost"
                        onClick={onSwitchMode}
                        className="text-white/80 hover:text-white"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Avatar */}
                <div className="relative group">
                    {/* Pulsing ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-black"
                        {...pulseAnimation}
                    />

                    {/* Avatar container */}
                    <div
                        className="
                          relative w-32 h-32 rounded-full
                          border-8 border-black/40
                          bg-black/10
                          backdrop-blur-sm
                          shadow-2xl
                          overflow-hidden
                        "
                    >
                        <img
                            src={
                                profile.avatarUrl ||
                                "https://i.gyazo.com/f8a062652f75412dda3c89d0ab371e88.png"
                            }
                            alt={`${profile.firstName} ${profile.lastName}`}
                            className="w-full h-full object-cover"
                        />

                        {/* 🖼️ Edit avatar overlay */}
                        {isEditing && onEditAvatar && (
                            <button
                                onClick={onEditAvatar}
                                className="
                                  absolute inset-0
                                  flex items-center justify-center
                                  bg-black/50
                                  opacity-0 group-hover:opacity-100
                                  transition
                                "
                            >
                                <Camera className="w-6 h-6 text-white" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Name + code */}
                <div className="text-center">
                    <h1 className={`text-xl font-bold ${styles.text}`}>
                        {profile.firstName} {profile.lastName}
                    </h1>
                    <p className={`text-sm ${styles.hint}`}>
                        #{profile.technicalId}
                    </p>
                </div>
            </div>
        </div>
    );
}
