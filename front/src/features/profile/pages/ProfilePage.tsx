import { useState } from "react";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { useProfile } from "@/features/profile/hooks/useProfile";
import AvatarEditor from "@/features/profile/components/AvatarEditor";
import { uploadAvatar } from "@/shared/lib/supabase/uploadAvatar";
import {useNavigate} from "react-router-dom";
import {Tabs,TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {GeneralCard} from "@/features/profile/components/GeneralCard";
import {MainContent, MainLayout} from "@/layouts/MainLayout";
import type {Profile} from "@/features/profile/schemas/userProfile.schema";
import {BodyCard} from "@/features/profile/components/BodyCard";
import {ReferenceCard} from "@/features/profile/components/ReferenceCard";
import {uploadReference} from "@/shared/lib/supabase/uploadReference";
import {WeaponCard} from "@/features/profile/components/WeaponCard";
import {TagCard} from "@/features/profile/components/TagCard";
import {uploadTag} from "@/shared/lib/supabase/uploadTag";

export default function ProfilePage() {
    const [openAvatarEditor, setOpenAvatarEditor] = useState(false);
    const { profile, updateAvatar, updateProfile, updateReference, updateTag } = useProfile();
    const navigate = useNavigate()

    if (!profile) return null;

    const handleAvatarChange = async (blob: Blob) => {
        if (!profile) return;
        const url = await uploadAvatar(profile.id, blob);
        await updateAvatar(url);
        setOpenAvatarEditor(false);
    };

    const handleReferenceUpload = async (file: File) => {
        if (!profile) return;
        const url = await uploadReference(profile.id, file);
        await updateReference(url);
    };

    const handleTagUpload = async (file: File) => {
        if (!profile) return;
        const url = await uploadTag(profile.id, file);
        await updateTag(url);
    };

    const handleSave = async (data: Partial<Profile>) => {
        await updateProfile(data);
    };

    return (
        <MainLayout>
            <ProfileHeader
                user={profile}
                isEditing
                onBack={() => navigate('/')}
                onEditAvatar={() => setOpenAvatarEditor(true)}
            />

            {openAvatarEditor && (
                <AvatarEditor
                    image={profile.avatarUrl}
                    onSave={handleAvatarChange}
                    onCancel={() => setOpenAvatarEditor(false)}
                />
            )}

            <MainContent>
                <Tabs defaultValue="general">
                    <TabsList>
                        <TabsTrigger value="general">Général</TabsTrigger>
                        <TabsTrigger value="body">Physique</TabsTrigger>
                        <TabsTrigger value="weapon">Arme(s) / Tag</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <GeneralCard
                            profile={profile}
                            onSave={handleSave}
                        />
                    </TabsContent>
                    <TabsContent value="body" className="flex flex-col gap-8">
                        <BodyCard
                            profile={profile}
                            onSave={handleSave}
                        />
                        <ReferenceCard
                            profile={profile}
                            onSave={handleReferenceUpload}
                        />
                    </TabsContent>
                    <TabsContent value="weapon" className="flex flex-col gap-8">
                        <WeaponCard
                            profile={profile}
                            onSave={handleSave}
                        />
                        <TagCard
                            profile={profile}
                            onSave={handleTagUpload}
                        />
                    </TabsContent>
                </Tabs>
            </MainContent>
        </MainLayout>
    );
}
