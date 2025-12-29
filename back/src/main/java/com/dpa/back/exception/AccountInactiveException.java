package com.dpa.back.exception;

public class AccountInactiveException extends RuntimeException{
    public AccountInactiveException() {
        super("User inactive");
    }

    public AccountInactiveException(String message) {
        super(message);
    }
}