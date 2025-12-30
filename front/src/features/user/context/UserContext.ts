import { createContext } from 'react'
import type {UserContextType} from "@/features/user/hooks/useUser";

export const UserContext = createContext<UserContextType | null>(null)