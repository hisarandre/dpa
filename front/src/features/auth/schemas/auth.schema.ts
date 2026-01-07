import { z } from 'zod'
import {CategoryType} from "@/features/user/types/category.type";

export const loginSchema = z.object({
    username: z.string()
        .min(1, "Le nom d'utilisateur est requis")
        .trim(),
    password: z.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(255, "Le mot de passe est trop long (max 255 caractères)")
})

export const registerSchema = z.object({
    username: z.string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(50, "Le nom d'utilisateur est trop long (max 50 caractères)")
        .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores")
        .trim(),
    email: z.string()
        .min(1, "L'email est requis")
        .email("Veuillez entrer une adresse email valide")
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères, une maj, une min, un chiffre et un caractère spécial")
        .max(255, "Le mot de passe est trop long (max 255 caractères)"),
    confirmPassword: z.string()
        .min(1, "Veuillez confirmer votre mot de passe"),
    firstName: z.string()
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(50, "Le prénom est trop long")
        .trim(),
    lastName: z.string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom est trop long")
        .trim(),
    category: z.enum(Object.values(CategoryType))
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>