// @ts-ignore
export enum RankType {
    BOSS = "BOSS",
    CAPTAIN = "CAPTAIN",
    MEMBER = "MEMBER",
}

export const rankLabels: Record<RankType, string> = {
    [RankType.BOSS]: 'Boss',
    [RankType.CAPTAIN]: 'Capitaine',
    [RankType.MEMBER]: 'Membre',
}