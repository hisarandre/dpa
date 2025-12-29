import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import {ProtectedRoute} from '@/features/auth/components/ProtectedRoute'
import PublicRoute from '@/features/auth/components/PublicRoute'
import {UserProvider} from "@/features/user/context/UserProvider";
import { AuthProvider } from '@/features/auth/context/AuthProvider'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <RegisterPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App