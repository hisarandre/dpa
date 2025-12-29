import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {Mail} from "lucide-react";

function InputEmail({
                        value,
                        onChange,
                        disabled
                    }: {
    value: string
    onChange: (value: string) => void
    disabled: boolean
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">
                Email
            </Label>
            <div className="relative">
                <Mail
                    className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                />
                <Input
                    className="bg-white/5 border-white/10 pl-9 text-white placeholder:text-gray-500 focus-visible:ring-white/20 focus-visible:border-white/30"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    disabled={disabled}
                    autoComplete="email"
                    aria-label="Adresse email"
                />
            </div>
        </div>
    )
}
export { InputEmail }
