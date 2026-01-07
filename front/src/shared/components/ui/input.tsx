import * as React from "react"

import {cn} from "@/shared/lib/utils"

function Input({className, type, ...props}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "placeholder:text-gray " +
                "selection:bg-primary selection:text-primary-foreground " +
                "h-9 w-full " +
                "min-w-0 " +
                "rounded-md " +
                "border border-gray " +
                "bg-transparent " +
                "px-3 py-1 " +
                "text-base " +
                "shadow-xs " +
                "transition-[color,box-shadow] " +
                "outline-none " +
                "file:text-gray-light file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:ring-white/20 focus-visible:border-white/30 focus-visible:ring-[3px]",
                "aria-invalid:ring-border-red-500/20 aria-invalid:border-red-500",
                className
            )}
            {...props}
        />
    )
}

export {Input}
