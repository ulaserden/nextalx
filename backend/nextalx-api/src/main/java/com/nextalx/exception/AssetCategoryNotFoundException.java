package com.nextalx.exception;

public class AssetCategoryNotFoundException extends RuntimeException {

    public AssetCategoryNotFoundException(String message) {
        super(message);
    }
}