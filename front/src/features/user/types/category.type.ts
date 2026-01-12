export const CategoryType = {
    DEFAULT: 'DEFAULT',
    MELEE: 'MELEE',
    FIREARM: 'FIREARM',
    HAND_TO_HAND: 'HAND_TO_HAND',
    EXPLOSIVE: 'EXPLOSIVE',
    HACKER: 'HACKER',
} as const

export type CategoryType =
    (typeof CategoryType)[keyof typeof CategoryType]

export const categoryLabels: Record<CategoryType, string> = {
    [CategoryType.DEFAULT]: 'Civil',
    [CategoryType.MELEE]: 'Armes blanches',
    [CategoryType.FIREARM]: 'Armes à feu',
    [CategoryType.HAND_TO_HAND]: 'Mains nues',
    [CategoryType.EXPLOSIVE]: 'Explosif',
    [CategoryType.HACKER]: 'Hacker',
}