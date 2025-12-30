
import { Upload } from "lucide-react";
import {UserProfileType} from "@/features/user/types/userProfile.type";

interface PhysiqueTabProps {
    data: UserProfileType;
    isEditing: boolean;
    onChange: (data: UserProfileType) => void;
}

export function PhysiqueTab({ data, isEditing, onChange }: PhysiqueTabProps) {
    const handleChange = (field: keyof UserProfileType, value: string) => {
        onChange({ ...data, [field]: value });
    };

    const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Cette fonction sera gérée par le parent
            console.log("Upload reference image:", file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="tatouage">Tatouage</Label>
                    {isEditing ? (
                        <Input
                            id="tatouage"
                            value={data.tatouage || ""}
                            onChange={(e) => handleChange("tatouage", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.tatouage || "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="taille">Taille (cm)</Label>
                    {isEditing ? (
                        <Input
                            id="taille"
                            type="number"
                            value={data.taille || ""}
                            onChange={(e) => handleChange("taille", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.taille ? `${data.taille} cm` : "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="carrure">Carrure</Label>
                    {isEditing ? (
                        <Input
                            id="carrure"
                            value={data.carrure || ""}
                            onChange={(e) => handleChange("carrure", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.carrure || "—"}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Photo de référence</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                    {data.referenceImageUrl ? (
                        <div className="relative group">
                            <img
                                src={data.referenceImageUrl}
                                alt="Référence"
                                className="w-full h-64 object-contain rounded-lg"
                            />
                            {isEditing && (
                                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                    <Upload className="w-8 h-8 text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleReferenceUpload}
                                    />
                                </label>
                            )}
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
                            <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                                {isEditing ? "Cliquez pour uploader une image" : "Aucune image"}
                            </p>
                            {isEditing && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleReferenceUpload}
                                />
                            )}
                        </label>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    Uploadé le {data.referenceUploadDate || "—"}
                </p>
            </div>
        </div>
    );
}