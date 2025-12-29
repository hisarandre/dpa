import { createContext } from 'react'
import type {UserContextType} from "@/features/user/types/user.type";

export const UserContext = createContext<UserContextType | null>(null)