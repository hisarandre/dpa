import { CategoryType } from '@/features/user/types/category.type'

export const userCategoryStyles: Record<CategoryType, {
    gradient: string
    gradientFromRight: string
    text: string
    hint: string
    badge: string
}> = {
    [CategoryType.DEFAULT]: {
        gradient: `
            bg-gradient-to-b
            from-primary/30
            via-primary/10
            via-primary/5
            to-gray-dark
        `,
        gradientFromRight:'from-primary/70',
        text: 'text-primary',
        hint: 'text-primary/50',
        badge: 'border-primary/50 text-gray-light',
    },

    [CategoryType.MELEE]: {
        gradient: `
            bg-gradient-to-b
            from-category-melee/30
            via-category-melee/10
            via-category-melee/5
            to-gray-dark
        `,
        gradientFromRight:'from-category-melee/70',
        text: 'text-category-melee',
        hint: 'text-category-melee/70',
        badge: 'border-category-melee/40 text-gray-light',
    },

    [CategoryType.FIREARM]: {
        gradient: `
            bg-gradient-to-b
            from-category-firearm/30
            via-category-firearm/10
            via-category-firearm/5
            to-gray-dark
        `,
        gradientFromRight:'from-category-firearm/70',
        text: 'text-category-firearm',
        hint: 'text-category-firearm/70',
        badge: 'border-category-firearm/40 text-gray-light',
    },

    [CategoryType.HAND_TO_HAND]: {
        gradient: `
            bg-gradient-to-b
            from-category-unarmed/30
            via-category-unarmed/10
            via-category-unarmed/5
            to-gray-dark
        `,
        gradientFromRight:'from-category-unarmed/70',
        text: 'text-category-unarmed',
        hint: 'text-category-unarmed/70',
        badge: 'border-category-unarmed/40 text-gray-light',
    },

    [CategoryType.EXPLOSIVE]: {
        gradient: `
            bg-gradient-to-b
            from-category-explosive/30
            via-category-explosive/10
            via-category-explosive/5
            to-gray-dark
        `,
        gradientFromRight:'from-category-explosive/70',
        text: 'text-category-explosive',
        hint: 'text-category-explosive/70',
        badge: 'border-category-explosive/40 text-gray-light',
    },

    [CategoryType.HACKER]: {
        gradient: `
            bg-gradient-to-b
            from-category-hacker/30
            via-category-hacker/10
            via-category-hacker/5
            to-gray-dark
        `,
        gradientFromRight:'from-category-hacker/70',
        text: 'text-category-hacker',
        hint: 'text-category-hacker/70',
        badge: 'border-category-hacker/40 text-gray-light',
    },
}
