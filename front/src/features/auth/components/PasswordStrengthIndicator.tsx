import { Check, X } from 'lucide-react'

interface PasswordRequirement {
    label: string
    test: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
    { label: 'Au moins 6 caractères', test: (pwd) => pwd.length >= 6 },
    { label: 'Une majuscule', test: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'Une minuscule', test: (pwd) => /[a-z]/.test(pwd) },
    { label: 'Un chiffre', test: (pwd) => /[0-9]/.test(pwd) },
    { label: 'Un caractère spécial', test: (pwd) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;'`~]/.test(pwd) }
]

interface PasswordStrengthIndicatorProps {
    password: string
    className?: string
}

export function PasswordStrengthIndicator({ password, className = '' }: PasswordStrengthIndicatorProps) {
    const results = passwordRequirements.map(req => ({
        ...req,
        met: req.test(password)
    }))

    const allRequirementsMet = results.every(r => r.met)

    // Ne rien afficher si le champ est vide OU si tous les critères sont remplis
    if (!password || allRequirementsMet) return null

    return (
        <div className={`space-y-2 mt-4 ${className}`}>
            {/* Barre de progression compacte */}
            <div className="flex items-center gap-1.5">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            result.met ? 'bg-category-hacker' : 'bg-gray-light'
                        }`}
                    />
                ))}
            </div>

            {/* Critères en grille compacte */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                            result.met ? 'text-category-hacker' : 'text-gray-light'
                        }`}
                    >
                        {result.met ? (
                            <Check className="w-3 h-3 flex-shrink-0" strokeWidth={3} />
                        ) : (
                            <X className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                        )}
                        <span className="truncate">{result.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}