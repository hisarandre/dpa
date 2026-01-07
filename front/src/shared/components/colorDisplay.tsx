import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface ColorDisplayProps {
    color?: string
    colors?: string[]
    label: string
    className?: string
}

export function ColorDisplay({color, colors,label, className }: ColorDisplayProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const colorList = colors ?? (color ? [color] : [])
    if (colorList.length === 0) return null

    const handleCopy = async (value: string, index: number) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopiedIndex(index)
            setTimeout(() => setCopiedIndex(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className={cn('flex gap-6', className)}>
            {colorList.map((value, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-1 text-center"
                >
                    {/* Bulle */}
                    <button
                        onClick={() => handleCopy(value, index)}
                        title={`Copier ${value}`}
                        style={{ backgroundColor: value }}
                        className="relative w-12 h-12 rounded-full border-2 border-gray-light
                       overflow-hidden group cursor-pointer transition-transform
                       hover:scale-110"
                    >
                        <div className="absolute inset-0 bg-black/50 opacity-0
                            group-hover:opacity-100 transition-opacity
                            flex items-center justify-center">
                            {copiedIndex === index ? (
                                <Check className="w-4 h-4 text-white" />
                            ) : (
                                <Copy className="w-4 h-4 text-white" />
                            )}
                        </div>
                    </button>

                    {/* Nom */}
                    <span className="text-xs text-gray-light">{label}</span>

                    {/* Code */}
                    <span className="text-xs text-gray-lighter font-mono">{value}</span>
                </div>
            ))}
        </div>
    )
}
