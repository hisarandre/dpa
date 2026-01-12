export const CONTACT_CATEGORIES = [
    { key: 'FAVORITES', label: 'Favoris' },
    { key: 'ALL', label: 'Tous' },
    { key: 'HIGH_RANKS', label: 'Boss/Capitaines' },
    { key: 'HAND_TO_HAND', label: 'Mains nues' },
    { key: 'MELEE', label: 'Armes blanches' },
    { key: 'FIREARM', label: 'Armes à feu' },
    { key: 'EXPLOSIVE', label: 'Explosifs' },
    { key: 'HACKER', label: 'Hackers' },
] as const

export type ContactFilterKey = typeof CONTACT_CATEGORIES[number]['key']

export const isContactFilterKey = (value: string): value is ContactFilterKey => {
    return CONTACT_CATEGORIES.some(cat => cat.key === value)
}