package com.dpa.back.exception;

import com.dpa.back.dto.error.ErrorResponse;
import com.dpa.back.dto.error.ErrorValidationResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==================== Validation Errors ====================

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorValidationResponse> handleHandlerMethodValidation(
            HandlerMethodValidationException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getAllErrors().forEach(error -> {
            String fieldName = extractFieldName(error);
            errors.put(fieldName, error.getDefaultMessage());
        });

        log.warn("Handler method validation error: {}", errors);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorValidationResponse(
                        "VALIDATION_ERROR",
                        "Validation failed",
                        HttpStatus.BAD_REQUEST.value(),
                        errors
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorValidationResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        log.warn("Validation error: {}", errors);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorValidationResponse(
                        "VALIDATION_ERROR",
                        "Validation failed",
                        HttpStatus.BAD_REQUEST.value(),
                        errors
                ));
    }

    // ==================== Authentication & Authorization ====================

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        log.warn("Authentication failed: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.UNAUTHORIZED,
                "INVALID_CREDENTIALS",
                "Invalid username or password"
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                "ACCESS_DENIED",
                ex.getMessage()
        );
    }

    @ExceptionHandler(AccountInactiveException.class)
    public ResponseEntity<ErrorResponse> handleAccountInactive(AccountInactiveException ex) {
        log.warn("Account inactive: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                "ACCOUNT_INACTIVE",
                ex.getMessage()
        );
    }

    // ==================== User-Related Errors ====================

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        log.warn("User already exists: {}", ex.getMessage());

        String errorCode = determineUserExistsErrorCode(ex.getField());

        return buildErrorResponse(
                HttpStatus.CONFLICT,
                errorCode,
                ex.getMessage()
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        log.warn("User not found: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                "USER_NOT_FOUND",
                ex.getMessage()
        );
    }

    // ==================== Entity & Resource Errors ====================

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        log.warn("Entity not found: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                "ENTITY_NOT_FOUND",
                ex.getMessage()
        );
    }


    // ==================== General Errors ====================

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(IllegalStateException ex) {
        log.warn("Illegal state: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.CONFLICT,
                "ILLEGAL_STATE",
                ex.getMessage()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("Illegal argument: {}", ex.getMessage());

        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                "INVALID_ARGUMENT",
                ex.getMessage()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        log.error("Unexpected runtime exception: ", ex);

        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "INTERNAL_ERROR",
                "An unexpected error occurred"
        );
    }

    // ==================== Helper Methods ====================

    private ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus status,
            String code,
            String message) {

        ErrorResponse errorResponse = new ErrorResponse(code, message, status.value());
        return ResponseEntity.status(status).body(errorResponse);
    }

    private String determineUserExistsErrorCode(String field) {
        if (field == null) {
            return "USER_ALREADY_EXISTS";
        }
        return switch (field) {
            case "username" -> "USERNAME_ALREADY_EXISTS";
            case "email" -> "EMAIL_ALREADY_EXISTS";
            default -> "USER_ALREADY_EXISTS";
        };
    }

    private String extractFieldName(MessageSourceResolvable error) {
        String[] codes = error.getCodes();
        if (codes != null && codes.length > 0) {
            String code = codes[0];
            int lastDot = code.lastIndexOf('.');
            if (lastDot > 0 && lastDot < code.length() - 1) {
                return code.substring(lastDot + 1);
            }
        }
        return "field";
    }
}