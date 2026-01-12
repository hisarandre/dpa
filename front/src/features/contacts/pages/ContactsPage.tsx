import { MainContent, MainLayout } from '@/layouts/MainLayout'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

import { useContacts } from '@/features/contacts/hooks/useContacts'
import { ContactCard } from '@/features/contacts/components/contactCard'
import { CONTACT_CATEGORIES } from '@/features/contacts/constants/ContactCategory'

export default function ContactsPage() {
    const { contacts, loading, error, filter, search, setFilter, setSearch, toggleFavorite } = useContacts()
    const navigate = useNavigate()

    return (
        <MainLayout>
            {/* Back arrow */}
            <div className="relative z-10 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="size-6" />
                </Button>
            </div>

            <MainContent>
                <h1 className="mb-4">Contacts</h1>

                {/* Search */}
                <Input
                    placeholder="Recherche"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="rounded-full bg-transparent"
                />

                {/* Filters */}
                <div className="flex flex-wrap gap-2 my-4">
                    {CONTACT_CATEGORIES.map(category => (
                        <button
                            key={category.key}
                            onClick={() => setFilter(category.key)}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm transition',
                                filter === category.key && 'bg-white text-black'
                            )}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-sm text-center my-4">
                        {error}
                    </p>
                )}

                {/* List */}
                <div className="space-y-1">
                    {loading ? (
                        <p className="text-muted-foreground text-sm text-center mt-8">
                            Chargement...
                        </p>
                    ) : contacts.length > 0 ? (
                        contacts.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                isFavorite={contact.favorite}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm text-center mt-8">
                            Aucun contact
                        </p>
                    )}
                </div>
            </MainContent>
        </MainLayout>
    )
}