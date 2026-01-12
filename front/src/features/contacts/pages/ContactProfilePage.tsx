import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import {useNavigate, useParams} from "react-router-dom";
import {Tabs,TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {GeneralCard} from "@/features/profile/components/GeneralCard";
import {MainContent, MainLayout} from "@/layouts/MainLayout";
import {BodyCard} from "@/features/profile/components/BodyCard";
import {ReferenceCard} from "@/features/profile/components/ReferenceCard";
import {WeaponCard} from "@/features/profile/components/WeaponCard";
import {TagCard} from "@/features/profile/components/TagCard";
import {usePublicProfile} from "@/features/profile/hooks/usePublicProfile";

export default function ContactProfilePage() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { profile, loading, error } = usePublicProfile(id)

    if (loading) return <div>Loading...</div>
    if (error || !profile) return <div>Profil introuvable</div>

    return (
        <MainLayout>
            <ProfileHeader
                user={profile}
                onBack={() => navigate('/contacts')}
            />

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
                        />
                    </TabsContent>
                    <TabsContent value="body" className="flex flex-col gap-8">
                        <BodyCard
                            profile={profile}
                        />
                        <ReferenceCard
                            profile={profile}
                        />
                    </TabsContent>
                    <TabsContent value="weapon" className="flex flex-col gap-8">
                        <WeaponCard
                            profile={profile}
                        />
                        <TagCard
                            profile={profile}
                        />
                    </TabsContent>
                </Tabs>
            </MainContent>
        </MainLayout>
    );
}
