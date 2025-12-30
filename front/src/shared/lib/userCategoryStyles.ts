import { CategoryType } from '@/features/user/types/category.type'

export const userCategoryStyles: Record<CategoryType, {
    gradient: string
    text: string
    hint: string
    badge: string
}> = {
    [CategoryType.DEFAULT]: {
        gradient: `
      bg-gradient-to-b
      from-category-default/30
      via-category-default/10
      via-category-default/5
      to-background
    `,
        text: 'text-category-default',
        hint: 'text-category-default-soft',
        badge: 'border-category-default-soft/40 text-foreground',
    },

    [CategoryType.ARMES_BLANCHES]: {
        gradient: `
      bg-gradient-to-b
      from-category-melee/30
      via-category-melee/10
      via-category-melee/5
      to-background
    `,
        text: 'text-category-melee',
        hint: 'text-category-melee/70',
        badge: 'border-category-melee/40 text-category-melee/90',
    },

    [CategoryType.ARMES_A_FEU]: {
        gradient: `
      bg-gradient-to-b
      from-category-firearm/30
      via-category-firearm/10
      via-category-firearm/5
      to-background
    `,
        text: 'text-category-firearm',
        hint: 'text-category-firearm-soft',
        badge: 'border-category-firearm-soft/40 text-foreground',
    },

    [CategoryType.MAINS_NUES]: {
        gradient: `
      bg-gradient-to-b
      from-category-unarmed/30
      via-category-unarmed/10
      via-category-unarmed/5
      to-background
    `,
        text: 'text-category-unarmed',
        hint: 'text-category-unarmed/70',
        badge: 'border-category-unarmed/40 text-category-unarmed/90',
    },

    [CategoryType.EXPLOSIF]: {
        gradient: `
      bg-gradient-to-b
      from-category-explosive/30
      via-category-explosive/10
      via-category-explosive/5
      to-background
    `,
        text: 'text-category-explosive',
        hint: 'text-category-explosive/70',
        badge: 'border-category-explosive/40 text-category-explosive/90',
    },

    [CategoryType.HACKER]: {
        gradient: `
      bg-gradient-to-b
      from-category-hacker/30
      via-category-hacker/10
      via-category-hacker/5
      to-background
    `,
        text: 'text-category-hacker',
        hint: 'text-category-hacker/70',
        badge: 'border-category-hacker/40 text-category-hacker/90',
    },
}
