// components/ui/buttonLoading.tsx
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export interface ButtonLoadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    loadingText?: string
    children: ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
    ({
         loading = false,
         loadingText,
         children,
         disabled,
         className,
         variant,
         size,
         ...props
     }, ref) => {
        return (
            <Button
                ref={ref}
                disabled={disabled || loading}
                className={className}
                variant={variant}
                size={size}
                {...props}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {loadingText || children}
                    </>
                ) : (
                    children
                )}
            </Button>
        )
    }
)

ButtonLoading.displayName = "ButtonLoading"

export { ButtonLoading }