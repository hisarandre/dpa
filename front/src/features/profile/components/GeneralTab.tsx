import type { UserProfileType } from "@/features/user/types/userProfile.type";
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'


interface GeneralTabProps {
    data: UserProfileType;
    isEditing: boolean;
    onChange: (data: UserProfileType) => void;
}

export function GeneralTab({ data, isEditing, onChange }: GeneralTabProps) {
    const handleChange = (field: keyof UserProfileType, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">

                <div className="space-y-2">
                    <Label htmlFor="nomDeFamille">Nom de famille</Label>
                    {isEditing ? (
                        <Input
                            id="nomDeFamille"
                            value={data.lastName || ""}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.lastName || "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    {isEditing ? (
                        <Input
                            id="prenom"
                            value={data.firstName || ""}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.firstName || "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lePronom">Le pronom</Label>
                    {isEditing ? (
                        <Input
                            id="lePronom"
                            value={data.pronom || ""}
                            onChange={(e) => handleChange("pronom", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.pronom || "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="anniversaire">Anniversaire</Label>
                    {isEditing ? (
                        <Input
                            id="anniversaire"
                            type="date"
                            value={data.birthdate || ""}
                            onChange={(e) => handleChange("birthdate", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.birthdate || "—"}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="categorie">Catégorie d'arme</Label>
                    {isEditing ? (
                        <Input
                            id="categorie"
                            value={data.category || ""}
                            onChange={(e) => handleChange("category", e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{data.category || "—"}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="arme">Arme</Label>
                {isEditing ? (
                    <Input
                        id="arme"
                        value={data.weapon1 || ""}
                        onChange={(e) => handleChange("weapon1", e.target.value)}
                        placeholder="Description de l'arme..."
                    />
                ) : (
                    <p className="text-sm">{data.weapon1 || "—"}</p>
                )}
            </div>
        </div>
    );
}