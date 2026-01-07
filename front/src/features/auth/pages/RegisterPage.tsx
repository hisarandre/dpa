import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail } from 'lucide-react'
import {Controller, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '@/layouts/AuthLayout'
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from '@/shared/components/ui/card'
import { InputPassword } from '@/shared/components/inputPassword'
import { InputDpa } from '@/shared/components/inputDpa'
import { ErrorAlert } from '@/shared/components/errorAlert'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/auth.schema'
import { useApiError } from '@/shared/hooks/useApiError'
import { SuccessRegistration } from "@/features/auth/components/SuccessRegistration"
import { PasswordStrengthIndicator } from "@/features/auth/components/PasswordStrengthIndicator"
import {useAuth} from "@/features/auth/hooks/useAuth";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import {categoryLabels, CategoryType} from "@/features/user/types/category.type";
import {Button} from "@/shared/components/ui/button";


export default function RegisterPage() {
    const [serverError, setServerError] = useState('')
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const { register: registerUser } = useAuth()

    const { register, handleSubmit, control, formState: { errors, isSubmitting }, setError, watch } =
        useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
            mode: 'onBlur'
        })

    const { handleApiError } = useApiError({ setError, setServerError })

    // Watch password for strength indicator
    const password = watch('password')

    const formValues = watch()
    const isFormInvalid = !formValues.username ||
        !formValues.email ||
        !formValues.password ||
        !formValues.confirmPassword ||
        !formValues.firstName ||
        !formValues.lastName ||
        !formValues.category

    const onSubmit = async (data: RegisterFormData) => {
        setServerError('')
        try {
            await registerUser(data)
            setRegistrationSuccess(true)
        } catch (err) {
            handleApiError(err)
        }
    }

    if (registrationSuccess) {
        return (
            <AuthLayout>
                <SuccessRegistration />
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle>Créer un compte</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CardContent className="space-y-5">
                        {serverError && <ErrorAlert message={serverError} />}

                        <InputDpa
                            label="Nom d'utilisateur"
                            icon={<User className="h-4 w-4" />}
                            id="username"
                            type="text"
                            placeholder="Nom d'utilisateur"
                            {...register('username')}
                            disabled={isSubmitting}
                            autoComplete="username"
                            error={errors.username?.message}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputDpa
                                label="Prénom"
                                id="firstName"
                                type="text"
                                placeholder="Prénom"
                                {...register('firstName')}
                                disabled={isSubmitting}
                                autoComplete="given-name"
                                error={errors.firstName?.message}
                            />

                            <InputDpa
                                label="Nom"
                                id="lastName"
                                type="text"
                                placeholder="Nom"
                                {...register('lastName')}
                                disabled={isSubmitting}
                                autoComplete="family-name"
                                error={errors.lastName?.message}
                            />
                        </div>

                        <InputDpa
                            label="Email"
                            icon={<Mail className="h-4 w-4" />}
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            {...register('email')}
                            disabled={isSubmitting}
                            autoComplete="email"
                            error={errors.email?.message}
                        />

                        <div className="space-y-2">
                            <InputPassword
                                label="Mot de passe"
                                id="password"
                                placeholder="••••••••"
                                {...register('password')}
                                disabled={isSubmitting}
                                autoComplete="new-password"
                                error={errors.password?.message}
                            />

                            {/* Password strength indicator */}
                            <PasswordStrengthIndicator password={password || ''} />
                        </div>

                        <InputPassword
                            label="Confirmer le mot de passe"
                            id="confirmPassword"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                            disabled={isSubmitting}
                            autoComplete="new-password"
                            error={errors.confirmPassword?.message}
                        />

                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Catégorie
                                    </label>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {Object.values(CategoryType).map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {categoryLabels[category]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.category && (
                                        <p className="text-sm text-destructive">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-8">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isFormInvalid}
                            size="full"
                        >
                            {isSubmitting ? "Création..." : "S'inscrire"}
                        </Button>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-light">
                                Vous avez déjà un compte ?{' '}
                                <Link to="/login" className="text-primary hover:text-primary/70 font-semibold">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </AuthLayout>
    )
}