package com.nextalx.exception;

public class AssetAlreadyExistsException extends RuntimeException {

    public AssetAlreadyExistsException(String message) {
        super(message);
    }
}