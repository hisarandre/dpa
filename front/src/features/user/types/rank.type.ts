// @ts-ignore
export enum RankType {
    BOSS = "BOSS",
    SOUS_BOSS = "SOUS_BOSS",
    CAPITAINE = "CAPITAINE",
    MEMBRE = "MEMBRE",
}

export const rankLabels: Record<RankType, string> = {
    [RankType.BOSS]: 'Boss',
    [RankType.SOUS_BOSS]: 'Sous-boss',
    [RankType.CAPITAINE]: 'Capitaine',
    [RankType.MEMBRE]: 'Membre',
}