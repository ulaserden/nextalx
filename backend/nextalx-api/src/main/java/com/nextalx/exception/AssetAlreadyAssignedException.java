package com.nextalx.exception;

public class AssetAlreadyAssignedException
        extends RuntimeException {

    public AssetAlreadyAssignedException(
            String message
    ) {
        super(message);
    }
}