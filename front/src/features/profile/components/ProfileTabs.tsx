interface ProfileTabsProps {
    activeTab: "general" | "physique";
    onTabChange: (tab: "general" | "physique") => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
    return (
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <button
                onClick={() => onTabChange("general")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "general"
                        ? "bg-card shadow-sm"
                        : "hover:bg-card/50"
                }`}
            >
                Général
            </button>
            <button
                onClick={() => onTabChange("physique")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "physique"
                        ? "bg-card shadow-sm"
                        : "hover:bg-card/50"
                }`}
            >
                Physique
            </button>
        </div>
    );
}
