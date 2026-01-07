import {forwardRef, type InputHTMLAttributes, type ReactNode} from 'react'
import {cn} from '@/shared/lib/utils'
import {Label} from '@/shared/components/ui/label'
import {Input} from '@/shared/components/ui/input'

export interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
    error?: string
}

const InputDpa = forwardRef<HTMLInputElement, InputWithIconProps>(
    ({
         className,
         label,
         icon,
         iconPosition = 'left',
         error,
         id,
         ...props
     }, ref) => {
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
        const hasIcon = !!icon
        const paddingClass = hasIcon
            ? iconPosition === 'left' ? 'pl-10' : 'pr-10'
            : ''

        return (
            <div className="space-y-2 w-full">
                {label && (
                    <Label htmlFor={inputId}>
                        {label}
                    </Label>
                )}

                <div className="relative">
                    {icon && iconPosition === 'left' && (
                        <div
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray pointer-events-none z-10">
                            {icon}
                        </div>
                    )}

                    <Input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            paddingClass,
                            className
                        )}
                        aria-invalid={error ? true : undefined}
                        {...props}
                    />

                    {icon && iconPosition === 'right' && (
                        <div
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray pointer-events-none z-10">
                            {icon}
                        </div>
                    )}
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

InputDpa.displayName = "InputDpa"

export {InputDpa}