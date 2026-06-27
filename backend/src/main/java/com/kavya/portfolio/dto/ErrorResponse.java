package com.kavya.portfolio.dto;

import java.time.Instant;
import java.util.Map;

public record ErrorResponse(
    int status,
    String error,
    String message,
    String path,
    Instant timestamp,
    Map<String, String> validationErrors) {
}
