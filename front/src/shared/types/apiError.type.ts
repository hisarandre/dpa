// @ts-ignore
export enum ApiErrorCode {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export interface ApiError {
    code: ApiErrorCode | string
    message: string
    status: number
    timestamp?: string
}

export const isApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error
    )
}