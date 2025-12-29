import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token!)
        }
    })
    failedQueue = []
}

// Request interceptor : Ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor : Gérer le refresh token
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // Si 401 et que ce n'est pas déjà une tentative de retry
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Si c'est la route /auth/refresh qui échoue, déconnecter immédiatement
            if (originalRequest.url === '/auth/refresh') {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return Promise.reject(error)
            }

            // Si un refresh est déjà en cours, mettre en file d'attente
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                    }
                    return api(originalRequest)
                }).catch(err => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            const refreshToken = localStorage.getItem('refreshToken')

            if (!refreshToken) {
                // Pas de refresh token, déconnecter
                localStorage.removeItem('token')
                window.location.href = '/login'
                return Promise.reject(error)
            }

            try {
                // Appeler l'endpoint refresh
                const response = await axios.post('/api/auth/refresh', { refreshToken })
                const { token: newToken, refreshToken: newRefreshToken } = response.data

                // Stocker les nouveaux tokens
                localStorage.setItem('token', newToken)
                localStorage.setItem('refreshToken', newRefreshToken)

                // Traiter toutes les requêtes en attente
                processQueue(null, newToken)

                // Retry la requête originale avec le nouveau token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                }

                return api(originalRequest)

            } catch (refreshError) {
                // Refresh token invalide ou expiré
                processQueue(refreshError, null)

                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api