// components/ui/inputPassword.tsx
import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
    showPassword?: boolean
    onToggleVisibility?: () => void
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    ({
         className,
         label = "Mot de passe",
         error,
         id,
         showPassword: externalShowPassword,
         onToggleVisibility,
         ...props
     }, ref) => {
        const [internalShowPassword, setInternalShowPassword] = useState(false)
        const inputId = id || 'password'

        const showPassword = externalShowPassword ?? internalShowPassword
        const toggleVisibility = onToggleVisibility || (() => setInternalShowPassword(prev => !prev))

        return (
            <div className="space-y-2 w-full">
                {label && (
                    <Label htmlFor={inputId} className="text-gray-200">
                        {label}
                    </Label>
                )}

                <div className="relative">
                    <Input
                        ref={ref}
                        id={inputId}
                        type={showPassword ? "text" : "password"}
                        className={cn(
                            "pr-10",
                            "text-white placeholder:text-gray-500",
                            "border-gray-700",
                            "focus-visible:ring-white/20 focus-visible:border-white/30",
                            error && "border-red-500 focus-visible:ring-red-500/20 aria-invalid:border-red-500",
                            className
                        )}
                        aria-invalid={error ? true : undefined}
                        {...props}
                    />

                    <Button
                        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                        onClick={toggleVisibility}
                        size="icon"
                        type="button"
                        variant="ghost"
                        tabIndex={-1}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>

                {error && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

InputPassword.displayName = "InputPassword"

export { InputPassword }