import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import {ProtectedRoute} from '@/features/auth/routes/ProtectedRoute'
import PublicRoute from '@/features/auth/routes/PublicRoute'
import {UserProvider} from "@/features/user/context/UserProvider";
import { AuthProvider } from '@/features/auth/context/AuthProvider'
import ProfilePage from "@/features/profile/pages/ProfilePage";

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
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
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