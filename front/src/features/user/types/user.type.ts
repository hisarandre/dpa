// @ts-ignore
export enum UserCategory {
    DEFAULT = "DEFAULT",
    ARMES_BLANCHES = "ARMES_BLANCHES",
    ARMES_A_FEU = "ARMES_A_FEU",
    MAINS_NUES = "MAINS_NUES",
    EXPLOSIF = "EXPLOSIF",
    HACKER = "HACKER"
}

export interface UserType {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    role: string
    isActive: boolean
    category: UserCategory
}

export interface UserContextType {
    user: UserType | null
    loading: boolean
    refreshUser: () => Promise<void>
}