import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Upload, X } from "lucide-react";
import type { UserProfileType } from "@/features/user/types/userProfile.type";
import placeHolder from "@/assets/images/placeholder.png";
import {ErrorAlert} from "@/shared/components/errorAlert";

interface ReferenceCardProps {
    profile: UserProfileType;
    onSave: (file: File) => Promise<void>;
}

export function ReferenceCard({ profile, onSave }: ReferenceCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB en bytes
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg'];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validation du type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('Seuls les fichiers JPEG sont acceptés');
            e.target.value = ''; // Reset l'input
            return;
        }

        // Validation de la taille
        if (file.size > MAX_SIZE) {
            setError('L\'image ne doit pas dépasser 2 MB');
            e.target.value = ''; // Reset l'input
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
            e.target.value = ''; // Reset l'input
        }
    };

    const referenceImage = profile.referenceImageUrl || placeHolder;
    const uploadedDate = profile.referenceUploadDate;

    return (
        <>
            <Card variant="dpa">
                <CardHeader className="flex justify-end">
                    <label htmlFor="reference-upload">
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
                    </label>
                    <input
                        id="reference-upload"
                        type="file"
                        accept=".jpg,.jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                </CardHeader>

                <CardContent className="space-y-4">
                    {error && (
                        <ErrorAlert message={error} />
                    )}

                    <div className="flex gap-10 items-start">
                        {/* Image à gauche */}
                        <div
                            className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => profile.referenceImageUrl && setIsModalOpen(true)}
                        >
                            <img
                                src={referenceImage}
                                alt="Référence du personnage"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Texte à droite */}
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold pb-6 border-b mb-6 border-gray-semi">Référence</h1>

                            {uploadedDate ? (
                                <p>
                                    Uploadé le {new Date(uploadedDate).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                                </p>
                            ) : (
                                <p>
                                    Aucune image uploadée
                                </p>
                            )}

                            <p className="mt-2 text-gray">
                                Format accepté : JPEG • Taille max : 2 MB
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modal pour l'image en grand */}
            {isModalOpen && profile.referenceImageUrl && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-12 right-0 text-white hover:text-gray-300"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                        <img
                            src={referenceImage}
                            alt="Référence du personnage"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}