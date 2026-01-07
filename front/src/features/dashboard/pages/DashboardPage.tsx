
import {UserHeader} from "@/features/dashboard/components/UserHeader";
import {useUser} from "@/features/user/hooks/useUser";
import {AppCard} from "@/features/dashboard/components/AppCard";
import {Box, Clock, ShoppingBag, User, Users} from "lucide-react";
import {MainContent, MainLayout} from "@/layouts/MainLayout";

export default function DashboardPage() {
    const { user } = useUser()

    return (
        <MainLayout>

            {user ? (
                <UserHeader user={user} />
            ) : (
                <div className="h-28 rounded-xl bg-gray-dark animate-pulse sm:max-w-4xl sm:mx-auto" />
            )}

            <MainContent>
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
            </MainContent>
        </MainLayout>
    )
}

