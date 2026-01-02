
import {UserHeader} from "@/features/dashboard/components/UserHeader";
import {useUser} from "@/features/user/hooks/useUser";
import {AppCard} from "@/features/dashboard/components/AppCard";
import {Box, Clock, ShoppingBag, User, Users} from "lucide-react";

export default function DashboardPage() {
    const { user } = useUser()

    return (
        <div className="min-h-screen p-0 sm:p-8">

            {user ? (
                <UserHeader user={user} />
            ) : (
                <div className="h-28 rounded-xl bg-gray-dark animate-pulse sm:max-w-4xl sm:mx-auto" />
            )}

            <div className="mt-6 p-8 sm:max-w-4xl sm:mx-auto">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    <AppCard
                        label="Profil"
                        icon={<User />}
                        to="/profile"
                    />

                    <AppCard
                        label="Historique"
                        icon={<Clock />}
                        locked
                    />

                    <AppCard
                        label="Banque"
                        icon={<Box />}
                        locked
                    />

                    <AppCard
                        label="Contacts"
                        icon={<Users />}
                        to="/contacts"
                    />

                    <AppCard
                        label="Boutique"
                        icon={<ShoppingBag />}
                        locked
                    />

                    <AppCard
                        label="Collection"
                        icon={<ShoppingBag />}
                        locked
                    />

                    <AppCard
                        label="SNS"
                        icon={<ShoppingBag />}
                        locked
                    />
                </div>
            </div>
        </div>
    )
}

