package com.nextalx.exception;

public class AssetCategoryAlreadyExistsException extends RuntimeException {

    public AssetCategoryAlreadyExistsException(String message) {
        super(message);
    }
}