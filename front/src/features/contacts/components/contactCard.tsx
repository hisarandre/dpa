import type {UserContactType} from "@/features/contacts/types/userContact.type";
import {userCategoryStyles} from "@/styles/userCategoryStyles";
import {useNavigate} from "react-router-dom";
import {Badge} from '@/shared/components/ui/badge'
import placeHolder from "@/assets/images/placeholder.png";
import {rankLabels} from "@/features/user/types/rank.type";
import {categoryLabels} from "@/features/user/types/category.type";
import {cn} from "@/shared/lib/utils";
import {Star} from "lucide-react";
import {useState} from "react";

interface ContactCardProps {
    contact: UserContactType;
    isFavorite: boolean;
    onToggleFavorite: (userId: number) => void;
}

export function ContactCard({ contact, isFavorite, onToggleFavorite }: ContactCardProps) {
    const navigate = useNavigate()
    const styles = userCategoryStyles[contact.category];
    const [isHovered, setIsHovered] = useState(false);

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(contact.id);
    };

    return (
        <button
            onClick={() => navigate(`/users/${contact.id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer group relative w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left bg-gray-semi/50 overflow-hidden"
        >
            {/* Gradient hover */}
            <span className={cn(
                'pointer-events-none absolute inset-0',
                'bg-gradient-to-l to-transparent',
                'opacity-0 transition-opacity duration-300',
                'group-hover:opacity-100',
                styles.gradientFromRight
            )}
            />

            <img
                src={contact.avatarUrl || placeHolder}
                alt="Profile picture"
                className="relative size-18 rounded-full border-8 border-gray-dark/75 object-cover"
            />

            {/* Infos */}
            <div className="flex-1 min-w-0">
                <p className="text-lg font-medium truncate">
                    {contact.firstName} {contact.lastName}
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={styles.badge}>
                        {rankLabels[contact.rank]}
                    </Badge>

                    <Badge variant="outline" className={styles.badge}>
                        {categoryLabels[contact.category]}
                    </Badge>
                </div>
            </div>

            {/* Star */}
            <div
                onClick={handleStarClick}
                className={cn(
                    "relative z-10 p-2 rounded-full transition-all duration-200",
                    "hover:bg-white/10",
                    isHovered || isFavorite ? "opacity-100" : "opacity-0"
                )}
            >
                <Star
                    className={cn(
                        "size-6 transition-all duration-200",
                        isFavorite
                            ? "fill-white text-white"
                            : "text-white/50 hover:text-white"
                    )}
                />
            </div>
        </button>
    )
}