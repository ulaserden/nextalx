package com.nextalx.exception;

public class AssignmentNotFoundException
        extends RuntimeException {

    public AssignmentNotFoundException(
            String message
    ) {
        super(message);
    }
}