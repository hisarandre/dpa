import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import {InputDpa} from "@/shared/components/inputDpa";

interface MultiColorPickerProps {
    label?: string
    value?: string[] | null,
    onChange: (colors: string[]) => void
    error?: string
    disabled?: boolean
}

export function MultiColorPicker({ label, value = [], onChange, error, disabled }: MultiColorPickerProps) {
    const [colors, setColors] = useState<string[]>(value && value.length > 0 ? value : ['#000000'])

    const handleColorChange = (index: number, newColor: string) => {
        const updated = [...colors]
        updated[index] = newColor
        setColors(updated)
        onChange(updated)
    }

    const addColor = () => {
        const updated = [...colors, '#000000']
        setColors(updated)
        onChange(updated)
    }

    const removeColor = (index: number) => {
        if (colors.length === 1) return // Garder au moins une couleur
        const updated = colors.filter((_, i) => i !== index)
        setColors(updated)
        onChange(updated)
    }

    return (
        <div className="space-y-2 w-full">
            {label && (
                <Label className="text-gray-light">{label}</Label>
            )}

            <div className="space-y-2">
                {colors.map((color, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        {/* Color picker */}
                        <div className="relative w-16 h-10">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                                disabled={disabled}
                                className="absolute inset-0 w-full h-full cursor-pointer p-0 border-0"
                            />
                        </div>

                        {/* Hex input */}
                        <InputDpa
                            type="text"
                            value={color}
                            onChange={(e) => {
                                let hex = e.target.value
                                if (!hex.startsWith('#')) hex = '#' + hex
                                handleColorChange(index, hex)
                            }}
                            placeholder="#000000"
                            disabled={disabled}
                            maxLength={7}
                            error={error}
                        />

                        {/* Remove button */}
                        {colors.length > 1 && (
                            <Button
                                type="button"
                                variant="link"
                                size="icon"
                                onClick={() => removeColor(index)}
                                disabled={disabled}
                                className="hover:bg-red-400/10"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Add button */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addColor}
                disabled={disabled}
                className="w-full"
            >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une couleur
            </Button>
        </div>
    )
}
