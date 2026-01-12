import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Pencil } from "lucide-react";
import { InfoGrid, InfoRow } from "@/shared/components/infoRow";
import type { UserProfileType } from "@/features/profile/types/userProfile.type";
import { bodyInfoSchema, type BodyInfo } from "@/features/profile/schemas/userProfile.schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputDpa } from "@/shared/components/inputDpa";
import {ColorPickerInput} from "@/shared/components/colorPickerInput";
import {MultiColorPicker} from "@/shared/components/multiColorsPicker";
import {ColorDisplay} from "@/shared/components/colorDisplay";


interface BodyInfoCardProps {
    profile: UserProfileType;
    onSave?: (data: BodyInfo) => Promise<void>;
}

export function BodyCard({ profile, onSave }: BodyInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } =
        useForm<BodyInfo>({
            resolver: zodResolver(bodyInfoSchema),
            defaultValues: {
                tattoo: profile.tattoo,
                height: profile.height,
                weight: profile.weight,
                eyeColor: profile.eyeColor,
                hairColors: profile.hairColors,
                skinTone: profile.skinTone,
            },
        });

    const onSubmit = async (data: BodyInfo) => {
        if (!onSave) return

        try {
            console.log(data);
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
                            label="Tatouage (révolution)"
                            id="tattoo"
                            type="text"
                            placeholder="Emplacement du tatouage de la révolution"
                            {...register('tattoo')}
                            disabled={isSubmitting}
                            error={errors.tattoo?.message}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputDpa
                                label="Taille (cm)"
                                id="height"
                                type="number"
                                placeholder="170"
                                {...register('height', { valueAsNumber: true })}
                                disabled={isSubmitting}
                                error={errors.height?.message}
                            />

                            <InputDpa
                                label="Poids (kg)"
                                id="weight"
                                type="number"
                                placeholder="70"
                                {...register('weight', { valueAsNumber: true })}
                                disabled={isSubmitting}
                                error={errors.weight?.message}
                            />
                        </div>

                        <Controller
                            name="eyeColor"
                            control={control}
                            render={({ field }) => (
                                <ColorPickerInput
                                    label="Couleur des yeux"
                                    id="eyeColor"
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    disabled={isSubmitting}
                                    error={errors.eyeColor?.message}
                                />
                            )}
                        />

                        <Controller
                            name="hairColors"
                            control={control}
                            render={({ field }) => (
                                <MultiColorPicker
                                    label="Couleur(s) des cheveux"
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isSubmitting}
                                    error={errors.hairColors?.message as string}
                                />
                            )}
                        />

                        <Controller
                            name="skinTone"
                            control={control}
                            render={({ field }) => (
                                <ColorPickerInput
                                    label="Teint de peau"
                                    id="skinTone"
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    disabled={isSubmitting}
                                    error={errors.skinTone?.message}
                                />
                            )}
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
                {onSave && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </CardHeader>

            <CardContent>
                {/* Infos textuelles */}
                <InfoGrid>
                    <InfoRow label="Tatouage (révolution)" value={profile.tattoo} />
                    <InfoRow
                        label="Taille"
                        value={profile.height ? `${profile.height} cm` : undefined}
                    />
                    <InfoRow
                        label="Poids"
                        value={profile.weight ? `${profile.weight} kg` : undefined}
                    />
                </InfoGrid>

                {/* Couleurs */}
                <div className="flex justify-center gap-6 pt-6">
                    <ColorDisplay color={profile.eyeColor || '#808080'} label="Yeux" />
                    <ColorDisplay color={profile.skinTone || '#808080'} label="Peau" />
                    <ColorDisplay colors={profile.hairColors || ['#808080']} label="Cheveux" />
                </div>
            </CardContent>
        </Card>
    );
}