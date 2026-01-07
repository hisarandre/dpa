import * as z from "zod";

// Schéma Général
export const generalInfoSchema = z.object({
    lastName: z
        .string()
        .min(1, "Le nom est requis")
        .max(50, "Nom trop long"),
    firstName: z
        .string()
        .min(1, "Le prénom est requis")
        .max(50, "Prénom trop long"),
    pronoun: z
        .string()
        .max(20, "Pronom trop long")
        .nullable()
        .optional(),
    birthdate: z
        .string()
        .nullable()
        .optional(),
    nationality: z
        .string()
        .max(50, "Nationalité trop longue")
        .nullable()
        .optional(),
    job: z
        .string()
        .max(100, "Job trop long")
        .nullable()
        .optional(),
});

// Schéma Body
const hexColor = z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur hexadécimale invalide (#RRGGBB)')

export const bodyInfoSchema = z.object({
    height: z
        .number()
        .int('La taille doit être un nombre entier')
        .min(50, 'Taille minimale : 50 cm')
        .max(300, 'Taille maximale : 300 cm')
        .nullable()
        .optional(),

    weight: z
        .number()
        .min(20, 'Poids minimal : 20 kg')
        .max(500, 'Poids maximal : 500 kg')
        .nullable()
        .optional(),

    tattoo: z
        .string()
        .trim()
        .min(2, 'Emplacement du tatouage trop court')
        .max(30, 'Emplacement du tatouage trop long')
        .nullable()
        .optional(),

    eyeColor: z
        .string()
        .trim()
        .min(3, 'Couleur des yeux trop courte')
        .max(30, 'Couleur des yeux trop longue')
        .nullable()
        .optional(),

    hairColors: z
        .array(hexColor)
        .min(1, 'Au moins une couleur de cheveux est requise')
        .max(5, 'Maximum 5 couleurs de cheveux')
        .nullable()
        .optional(),

    skinTone: z
        .string()
        .trim()
        .min(3, 'Teint de peau trop court')
        .max(30, 'Teint de peau trop long')
        .nullable()
        .optional(),
})

// Schéma Arme
export const weaponInfoSchema = z.object({
    accessories: z
        .string()
        .max(100, "La description est trop longue")
        .nullable()
        .optional(),
    weapon1: z
        .string()
        .max(100, "Nom d'arme trop long")
        .nullable()
        .optional(),
    weapon2: z
        .string()
        .max(100, "Nom d'arme trop long")
        .nullable()
        .optional(),
});

// Schéma complet du profil (union de tous)
export const profileSchema = z.object({
    ...generalInfoSchema.shape,
    ...bodyInfoSchema.shape,
    ...weaponInfoSchema.shape,
});

// Types TypeScript exportés
export type GeneralInfo = z.infer<typeof generalInfoSchema>;
export type BodyInfo = z.infer<typeof bodyInfoSchema>;
export type WeaponInfo = z.infer<typeof weaponInfoSchema>;
export type Profile = z.infer<typeof profileSchema>;