import { useState } from "react";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { useProfile } from "@/features/user/hooks/useProfile";
import ProfileViewPage from "@/features/profile/pages/ProfileViewPage";
import AvatarEditor from "@/features/profile/utils/AvatarEditor";
import { uploadAvatar } from "@/shared/lib/supabase/uploadAvatar";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [openAvatarEditor, setOpenAvatarEditor] = useState(false);

    const { profile, updateProfile } = useProfile();

    if (!profile) return null;

    const handleAvatarChange = async (blob: Blob) => {
        if (!profile) return;

        const url = await uploadAvatar(profile.id, blob);

        await updateProfile({ avatarUrl: url });

        setOpenAvatarEditor(false);
    };

    return (
        <div className="min-h-screen p-0 sm:p-8">
            {isEditing ? (
                <>
                    <ProfileHeader
                        profile={profile}
                        isEditing
                        onBack={() => setIsEditing(false)}
                        onEditAvatar={() => setOpenAvatarEditor(true)}
                        onSwitchMode={() => {}}
                    />

                    {openAvatarEditor && (
                        <AvatarEditor
                            image={profile.avatarUrl}
                            onSave={handleAvatarChange}
                            onCancel={() => setOpenAvatarEditor(false)}
                        />
                    )}

                    {/* UI MODE EDIT */}
                </>
            ) : (
                <>
                    <ProfileHeader
                        profile={profile}
                        isEditing={false}
                        onSwitchMode={() => setIsEditing(true)}
                    />

                    {/* UI MODE VIEW */}
                    <ProfileViewPage profile={profile} />
                </>
            )}
        </div>
    );
}
