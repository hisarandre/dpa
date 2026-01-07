import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Input } from '@/shared/components/ui/input'
import {InputDpa} from "@/shared/components/inputDpa";
import {Label} from "@/shared/components/ui/label";

export interface ColorPickerInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
}

const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(
    ({ label, error, id, value, onChange }, ref) => {
        const inputId = id || `color-${label?.toLowerCase().replace(/\s+/g, '-')}`
        const [colorValue, setColorValue] = useState(value || '#000000')

        const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setColorValue(e.target.value)
            onChange?.(e)
        }

        const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let hex = e.target.value

            // Ajouter # si manquant
            if (!hex.startsWith('#')) {
                hex = '#' + hex
            }
            setColorValue(hex)
            onChange?.({ ...e, target: { ...e.target, value: hex } } as any)
        }

        return (
            <div className="space-y-2 w-full">
                {label && (
                    <Label className="text-gray-light">{label}</Label>
                )}

                <div className="flex gap-2">
                    {/* Color picker */}
                    <Input
                        type="color"
                        value={colorValue as string}
                        onChange={handleColorChange}
                        className="inset-0 w-14 h-10 cursor-pointer p-0 border-0"
                    />
                    {/* Hex input */}
                    <InputDpa
                        ref={ref}
                        id={inputId}
                        type="text"
                        value={colorValue}
                        onChange={handleHexChange}
                        placeholder="#000000"
                        error={error}
                        maxLength={7}
                    />
                </div>
            </div>
        )
    }
)

ColorPickerInput.displayName = "ColorPickerInput"

export { ColorPickerInput }
