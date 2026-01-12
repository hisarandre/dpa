import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Upload} from "lucide-react";
import type { UserProfileType } from "@/features/profile/types/userProfile.type";
import {ErrorAlert} from "@/shared/components/errorAlert";

interface ReferenceCardProps {
    profile: UserProfileType;
    onSave?: (file: File) => Promise<void>;
}

export function TagCard({ profile, onSave }: ReferenceCardProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB en bytes
    const ALLOWED_TYPES = ['image/png'];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSave) return;

        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validation du type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('Seuls les fichiers PNG sont acceptés');
            e.target.value = '';
            return;
        }

        // Validation de la taille
        if (file.size > MAX_SIZE) {
            setError('L\'image ne doit pas dépasser 2 MB');
            e.target.value = '';
            return;
        }

        try {
            setIsUploading(true);
            await onSave(file);
            setError(null);
        } catch (error) {
            console.error("Erreur lors de l'upload:", error);
            setError("Erreur lors de l'upload de l'image");
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const tagUrl = profile.tagUrl;

    return (
        <Card variant="dpa">
            <CardHeader className="flex justify-end">
                <label htmlFor="tag-upload">
                    {onSave && (
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={isUploading}
                            asChild
                        >
                        <span className="cursor-pointer">
                            {isUploading ? "..." : <Upload className="h-4 w-4" />}
                        </span>
                        </Button>
                    )}
                </label>
                <input
                    id="tag-upload"
                    type="file"
                    accept=".png"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </CardHeader>

            <CardContent className="space-y-4">
                {error && <ErrorAlert message={error} />}

                <div className="h-48 flex items-center justify-center rounded-lg overflow-hidden">
                    {tagUrl ? (
                        <img
                            src={tagUrl}
                            alt="Tag du personnage"
                            className="h-full w-auto object-contain"
                        />
                    ) : (
                        <div className="text-center text-gray px-4">
                            <p className="mb-2">Aucune image uploadée</p>
                            <p>Format accepté : PNG • Taille max : 2 MB</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}