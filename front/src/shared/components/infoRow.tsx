import { cn } from "@/shared/lib/utils";
import type {ReactNode} from "react";

interface InfoRowProps {
    label: string;
    value: string | ReactNode;
    showDivider?: boolean;
    labelClassName?: string;
    valueClassName?: string;
}

function InfoRow({ label, value, showDivider = true, labelClassName, valueClassName }: InfoRowProps) {
    return (
        <>
      <span className={cn("text-sm text-gray-light", labelClassName)}>
        {label}
      </span>
            <span className={cn("text-base text-gray-lighter", valueClassName)}>
        {value || "—"}
      </span>
            {showDivider && (
                <hr className="col-span-2 border-white/5" />
            )}
        </>
    );
}

interface InfoGridProps {
    children: ReactNode;
    className?: string;
}

function InfoGrid({ children, className }: InfoGridProps) {
    return (
        <div className={cn("grid grid-cols-[140px_1fr] gap-4 items-center", className)}>
            {children}
        </div>
    );
}

export { InfoRow, InfoGrid };