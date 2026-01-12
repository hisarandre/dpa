import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Pencil } from "lucide-react";
import { InfoGrid, InfoRow } from "@/shared/components/infoRow";
import type { UserProfileType } from "@/features/profile/types/userProfile.type";
import { generalInfoSchema, type GeneralInfo } from "@/features/profile/schemas/userProfile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {InputDpa} from "@/shared/components/inputDpa";

interface GeneralInfoCardProps {
    profile: UserProfileType;
    onSave?: (data: GeneralInfo) => Promise<void>;
}

export function GeneralCard({ profile, onSave }: GeneralInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset,} =
        useForm<GeneralInfo>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            lastName: profile.lastName,
            firstName: profile.firstName,
            pronoun: profile.pronoun,
            birthdate: profile.birthdate,
            nationality: profile.nationality,
            job: profile.job,
        },
    });

    const onSubmit = async (data: GeneralInfo) => {
        if (!onSave) return

        try {
            await onSave(data)
            setIsEditing(false)
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error)
        }
    }

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
                            label="Nom *"
                            id="lastName"
                            type="text"
                            placeholder="Nom"
                            {...register('lastName')}
                            disabled={isSubmitting}
                            autoComplete="Nom de famille"
                            error={errors.lastName?.message}
                        />

                        <InputDpa
                            label="Prénom *"
                            id="lastName"
                            type="text"
                            placeholder="Prénom"
                            {...register('firstName')}
                            disabled={isSubmitting}
                            autoComplete="Prénom"
                            error={errors.firstName?.message}
                        />

                        <InputDpa
                            label="Pronom(s)"
                            id="pronoun"
                            type="text"
                            placeholder="Pronom(s)"
                            {...register('pronoun')}
                            disabled={isSubmitting}
                            autoComplete="Pronom"
                            error={errors.pronoun?.message}
                        />

                        <InputDpa
                            label="Date de naissance"
                            id="birthdate"
                            type="date"
                            placeholder="Date de naissance"
                            {...register('birthdate')}
                            disabled={isSubmitting}
                            autoComplete="Date de naissance"
                            error={errors.birthdate?.message}
                        />

                        <InputDpa
                            label="Nationalité / origine"
                            id="nationality"
                            type="text"
                            placeholder="Nationalité / origine"
                            {...register('nationality')}
                            disabled={isSubmitting}
                            autoComplete="Nationalité / origine"
                            error={errors.nationality?.message}
                        />

                        <InputDpa
                            label="Job"
                            id="job"
                            type="text"
                            placeholder="Job"
                            {...register('job')}
                            disabled={isSubmitting}
                            autoComplete="Job"
                            error={errors.job?.message}
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
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
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
                <InfoGrid>
                    <InfoRow label="Nom" value={profile.lastName} />
                    <InfoRow label="Prénom" value={profile.firstName} />
                    <InfoRow label="Pronom(s)" value={profile.pronoun} />
                    <InfoRow
                        label="Date de naissance"
                        value={
                            profile.birthdate
                                ? new Date(profile.birthdate).toLocaleDateString("fr-FR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : undefined
                        }
                    />
                    <InfoRow label="Nationalité / origine" value={profile.nationality} />
                    <InfoRow label="Job" value={profile.job} showDivider={false} />
                </InfoGrid>
            </CardContent>
        </Card>
    );
}