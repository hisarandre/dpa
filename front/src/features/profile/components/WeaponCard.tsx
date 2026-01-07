import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Pencil } from "lucide-react";
import { InfoGrid, InfoRow } from "@/shared/components/infoRow";
import type { UserProfileType } from "@/features/user/types/userProfile.type";
import { weaponInfoSchema, type WeaponInfo } from "@/features/profile/schemas/userProfile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputDpa } from "@/shared/components/inputDpa";

interface WeaponCardProps {
    profile: UserProfileType;
    onSave: (data: WeaponInfo) => Promise<void>;
}

export function WeaponCard({ profile, onSave }: WeaponCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    // Vérifier si l'utilisateur peut avoir une arme secondaire (tous sauf MEMBRE)
    const canHaveSecondWeapon = profile.rank !== 'MEMBRE';

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
        useForm<WeaponInfo>({
            resolver: zodResolver(weaponInfoSchema),
            defaultValues: {
                accessories: profile.accessories,
                weapon1: profile.weapon1,
                weapon2: profile.weapon2,
            },
        });

    const onSubmit = async (data: WeaponInfo) => {
        try {
            // Si pas autorisé, forcer weapon2 à null
            if (!canHaveSecondWeapon) {
                data.weapon2 = null;
            }
            await onSave(data);
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
        }
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Card variant="dpa">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <InputDpa
                            label="Arme"
                            id="weapon1"
                            type="text"
                            placeholder="Nom et description de l'arme"
                            {...register('weapon1')}
                            disabled={isSubmitting}
                            autoComplete="Arme"
                            error={errors.weapon1?.message}
                        />

                        {canHaveSecondWeapon && (
                            <InputDpa
                                label="Arme secondaire"
                                id="weapon2"
                                type="text"
                                placeholder="Nom et description de l'arme secondaire"
                                {...register('weapon2')}
                                disabled={isSubmitting}
                                autoComplete="Arme"
                                error={errors.weapon2?.message}
                            />
                        )}

                        <InputDpa
                            label="Accessoire(s)"
                            id="accessories"
                            type="text"
                            placeholder="Description des accesoires"
                            {...register('accessories')}
                            disabled={isSubmitting}
                            autoComplete="Accessoire"
                            error={errors.accessories?.message}
                        />
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        );
    }

    return (
        <Card variant="dpa">
            <CardHeader className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <InfoGrid>
                    <InfoRow label="Arme" value={profile.weapon1} />

                    {canHaveSecondWeapon && (
                        <InfoRow label="Arme secondaire" value={profile.weapon2}/>
                    )}

                    <InfoRow label="Accessoires" value={profile.accessories} showDivider={false}/>
                </InfoGrid>
            </CardContent>
        </Card>
    );
}