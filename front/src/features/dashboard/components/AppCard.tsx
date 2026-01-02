import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import * as React from "react";

interface AppCardProps {
    label: string
    icon: React.ReactNode
    to?: string
    locked?: boolean
}

export function AppCard({
                            label,
                            icon,
                            to,
                            locked = false,
                        }: AppCardProps) {
    const Content = (
        <div
            className={cn(
                `relative flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-semi text-gray-light aspect-square transition duration-300 group`,
                locked
                    ? 'opacity-30'
                    : 'hover:bg-gray/20 hover:text-gray-lighter cursor-pointer'
                )
            }
        >
            <div className="flex items-center justify-center transition text-gray-light group-hover:text-gray-lighter">
                {locked ? <Lock  /> : icon}
            </div>

            <span className="text-xs font-medium truncate">
                {label}
            </span>
        </div>
    )

    if (locked || !to) {
        return Content
    }

    return <Link to={to}>{Content}</Link>
}
