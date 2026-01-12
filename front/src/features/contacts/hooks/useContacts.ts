import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { userApi } from "@/features/user/services/user.api"
import type { UserContactType } from "@/features/contacts/types/userContact.type"
import type { ContactFilterKey } from '@/features/contacts/constants/ContactCategory'

interface UseContactsReturn {
    contacts: UserContactType[]
    loading: boolean
    error: string | null
    filter: ContactFilterKey
    search: string
    setFilter: (filter: ContactFilterKey) => void
    setSearch: (search: string) => void
    toggleFavorite: (userId: number) => Promise<void>
    refetch: () => Promise<void>
}

export function useContacts(): UseContactsReturn {
    const [contacts, setContacts] = useState<UserContactType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<ContactFilterKey>('FAVORITES')
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchContacts()
    }, [filter, search])

    const fetchContacts = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await userApi.getContacts(filter, search)
            setContacts(data)
        } catch (err) {
            console.error('Erreur lors de la récupération des contacts:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de charger les contacts')
            } else {
                setError('Impossible de charger les contacts')
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleFavorite = async (userId: number): Promise<void> => {
        try {
            setError(null)
            await userApi.toggleFavorite(userId)
            // Si on est sur le filtre FAVORITES, on retire le contact de la liste
            if (filter === 'FAVORITES') {
                setContacts(prev => prev.filter(contact => contact.id !== userId))
            } else {
                // Sinon, on met juste à jour le status
                setContacts(prev => prev.map(contact =>
                    contact.id === userId
                        ? { ...contact, favorite: !contact.favorite }
                        : contact
                ))
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour des favoris:', err)
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Impossible de mettre à jour les favoris')
            } else {
                setError('Impossible de mettre à jour les favoris')
            }
            await fetchContacts()
            throw err
        }
    }

    return {
        contacts,
        loading,
        error,
        filter,
        search,
        setFilter,
        setSearch,
        toggleFavorite,
        refetch: fetchContacts,
    }
}