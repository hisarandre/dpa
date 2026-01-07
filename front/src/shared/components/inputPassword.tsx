import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

export interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ label = "Mot de passe", error, id, className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const inputId = id || 'password'

        return (
            <div className="space-y-2 w-full">
                {label && (
                    <Label htmlFor={inputId}>
                        {label}
                    </Label>
                )}

                <div className="relative">
                    <Input
                        ref={ref}
                        id={inputId}
                        type={showPassword ? "text" : "password"}
                        className={cn("pr-10", className)}
                        aria-invalid={error ? true : undefined}
                        {...props}
                    />
                    <Button
                        className="absolute top-1/2 -translate-y-1/2 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(prev => !prev)}
                        size="icon"
                        type="button"
                        variant="blank"
                        tabIndex={-1}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400"/>
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400"/>
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