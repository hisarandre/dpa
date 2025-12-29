import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { InputPassword } from '@/shared/components/ui/inputPassword'
import { InputWithIcon } from '@/shared/components/ui/inputWithIcon'
import { ButtonLoading } from '@/shared/components/ui/buttonLoading'
import { ErrorAlert } from '@/shared/components/ui/errorAlert'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas/auth.schema'
import { useApiError } from '@/shared/hooks/useApiError'
import {useAuth} from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [serverError, setServerError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur'
    })

    const { handleApiError } = useApiError({ setError, setServerError })

    const formValues = watch()
    const isFormInvalid = !formValues.username?.trim() || !formValues.password?.trim()

    const onSubmit = async (data: LoginFormData) => {
        setServerError('')

        try {
            await login(data)

            setTimeout(() => {
                navigate('/')
            }, 50)

        } catch (err) {
            handleApiError(err)
        }
    }

    return (
        <AuthLayout>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle>Accès à mon DPA</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CardContent className="space-y-5">
                        {serverError && <ErrorAlert message={serverError} />}

                        <InputWithIcon
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

                        <InputPassword
                            label="Mot de passe"
                            id="password"
                            placeholder="••••••••"
                            {...register('password')}
                            disabled={isSubmitting}
                            autoComplete="current-password"
                            showPassword={showPassword}
                            onToggleVisibility={() => setShowPassword(prev => !prev)}
                            error={errors.password?.message}
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-8">
                        <ButtonLoading
                            type="submit"
                            disabled={isSubmitting || isFormInvalid}
                            className="w-full h-11 text-base font-medium bg-white text-gray-800 hover:bg-gray-200"
                            loading={isSubmitting}
                            loadingText="Connexion..."
                        >
                            Se connecter
                        </ButtonLoading>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-500">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-primary hover:text-red-600 font-semibold">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </AuthLayout>
    )
}