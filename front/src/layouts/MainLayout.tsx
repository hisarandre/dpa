import type {ReactNode} from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen p-0 sm:p-8">
            {children}
        </div>
    );
}

interface MainContentProps {
    children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
    return (
        <div className="mt-6 p-8 sm:max-w-4xl sm:mx-auto">
            {children}
        </div>
    );
}