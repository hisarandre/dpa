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
                            `
                              relative
                              flex flex-col items-center justify-center gap-2
                              rounded-xl
                              bg-gray-900
                              text-gray-400
                              aspect-square
                              transition-colors duration-200
                            `,
                            locked
                                ? 'opacity-30'
                                : 'hover:text-gray-200 cursor-pointer'
                        )}
                >
                {/* Icon / Lock */}
                <div
                    className="
                      flex items-center justify-center
                      text-gray-400
                      text-4xl
                      sm:text-3xl
                      md:text-4xl
                    "
                    >
                    {locked ? <Lock /> : icon}
                </div>

            {/* Label */}
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
