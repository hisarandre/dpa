// @ts-ignore
export enum CategoryType {
    DEFAULT = 'DEFAULT',
    ARMES_BLANCHES = 'ARMES_BLANCHES',
    ARMES_A_FEU = 'ARMES_A_FEU',
    MAINS_NUES = 'MAINS_NUES',
    EXPLOSIF = 'EXPLOSIF',
    HACKER = 'HACKER',
}

export const categoryLabels: Record<CategoryType, string> = {
    [CategoryType.DEFAULT]: 'Civil',
    [CategoryType.ARMES_BLANCHES]: 'Armes blanches',
    [CategoryType.ARMES_A_FEU]: 'Armes à feu',
    [CategoryType.MAINS_NUES]: 'Mains nues',
    [CategoryType.EXPLOSIF]: 'Explosif',
    [CategoryType.HACKER]: 'Hacker',
}