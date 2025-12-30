import { useState, useEffect } from "react";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileTabs } from "@/features/profile/components/ProfileTabs";
import { GeneralTab } from "@/features/profile/components/GeneralTab";
import { PhysiqueTab } from "@/features/profile/components/PhysiqueTab";
import {Save, X, Edit, Loader2, AlertCircle} from "lucide-react";
import { Button } from '@/shared/components/ui/button'
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { useProfile } from "@/features/user/hooks/useProfile";


export default function ProfileEditPage() {
    const { profile, loading, error, updateProfile, uploadImage } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "physique">("general");
    const [formData, setFormData] = useState(profile);
    const [isSaving, setIsSaving] = useState(false);

    // Sync formData avec profile quand il charge
    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleSave = async () => {
        if (!formData) return;

        try {
            setIsSaving(true);
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleImageUpload = async (file: File, type: "avatar" | "reference" | "banner") => {
        try {
            const imageUrl = await uploadImage(file, type);
            if (formData) {
                const fieldName = type === "avatar"
                    ? "avatarUrl"
                    : type === "reference"
                        ? "referenceImageUrl"
                        : "bannerUrl";
                setFormData({ ...formData, [fieldName]: imageUrl });
            }
        } catch (error) {
            console.error("Erreur lors de l'upload:", error);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen p-0 sm:p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Error state
    if (error || !profile || !formData) {
        return (
            <div className="min-h-screen p-0 sm:p-8">
                <div className="sm:max-w-4xl sm:mx-auto">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {error || "Impossible de charger le profil"}
                        </AlertDescription>
                    </Alert>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4"
                    >
                        Réessayer
                    </Button>
                </div>
            </div>
        );
    }

    // Main render (profile et formData sont garantis non-null ici)
    return (
        <div className="min-h-screen p-0 sm:p-8">
            <ProfileHeader
                profile={formData}
                isEditing={isEditing}
                onImageUpload={handleImageUpload}
            />

            <div className="mt-6 sm:max-w-4xl sm:mx-auto bg-card rounded-xl border">
                <div className="p-6 border-b flex items-center justify-between">
                    <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)} variant="default">
                                <Edit className="w-4 h-4 mr-2" />
                                Éditer
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    disabled={isSaving}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Annuler
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    variant="default"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
                                    Enregistrer
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === "general" ? (
                        <GeneralTab
                            data={formData}
                            isEditing={isEditing}
                            onChange={setFormData}
                        />
                    ) : (
                        <PhysiqueTab
                            data={formData}
                            isEditing={isEditing}
                            onChange={setFormData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
