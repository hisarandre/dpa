import { ApiErrorCode } from '@/shared/types/apiError.type'

export const API_ERROR_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
    [ApiErrorCode.INVALID_CREDENTIALS]: 'Identifiants incorrects',
    [ApiErrorCode.ACCOUNT_INACTIVE]: 'Votre compte est désactivé',
    [ApiErrorCode.UNAUTHORIZED]: 'Veuillez vous reconnecter',
    [ApiErrorCode.FORBIDDEN]: 'Accès refusé',
    [ApiErrorCode.INTERNAL_SERVER_ERROR]: 'Une erreur interne est survenue',
    [ApiErrorCode.INTERNAL_ERROR]: 'Une erreur interne est survenue',
}
