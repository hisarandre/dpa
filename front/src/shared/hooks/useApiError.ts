import { useCallback } from 'react'
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import { ApiErrorCode, isApiError } from '@/shared/types/apiError.type'
import { API_ERROR_MESSAGES } from '@/shared/errors/apiErrorMessages'
import axios from 'axios'

interface UseApiErrorOptions<T extends FieldValues> {
    setError: UseFormSetError<T>
    setServerError: (error: string) => void
}

export function useApiError<T extends FieldValues>({
                                                       setError,
                                                       setServerError
                                                   }: UseApiErrorOptions<T>) {
    const handleApiError = useCallback(
        (
            err: unknown,
            fieldMapping?: Partial<Record<ApiErrorCode, Path<T>>>
        ) => {
            // Axios error → récupérer data
            const apiError = axios.isAxiosError(err)
                ? err.response?.data
                : err

            if (!isApiError(apiError)) {
                setServerError('Une erreur est survenue')
                return
            }

            const code = apiError.code as ApiErrorCode
            const message =
                API_ERROR_MESSAGES[code] ??
                apiError.message ??
                'Une erreur est survenue'

            // Erreur liée à un champ
            if (fieldMapping?.[code]) {
                setError(fieldMapping[code]!, {
                    type: 'server',
                    message
                })
                return
            }

            // Erreur globale
            setServerError(message)
        },
        [setError, setServerError]
    )

    return { handleApiError }
}
