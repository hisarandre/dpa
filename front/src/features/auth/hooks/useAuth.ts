import type {AuthContextType} from "@/features/auth/types/auth.type";
import {useContext} from "react";
import {AuthContext} from "@/features/auth/context/AuthContext";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}