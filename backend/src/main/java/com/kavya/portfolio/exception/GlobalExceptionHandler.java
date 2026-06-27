package com.kavya.portfolio.exception;

import com.kavya.portfolio.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(ResourceNotFoundException.class)
  ResponseEntity<ErrorResponse> handleNotFound(
      ResourceNotFoundException exception,
      HttpServletRequest request) {
    return buildResponse(HttpStatus.NOT_FOUND, exception.getMessage(), request, Map.of());
  }

  @ExceptionHandler(BadRequestException.class)
  ResponseEntity<ErrorResponse> handleBadRequest(
      BadRequestException exception,
      HttpServletRequest request) {
    return buildResponse(HttpStatus.BAD_REQUEST, exception.getMessage(), request, Map.of());
  }

  @ExceptionHandler(UnauthorizedException.class)
  ResponseEntity<ErrorResponse> handleUnauthorized(
      UnauthorizedException exception,
      HttpServletRequest request) {
    return buildResponse(HttpStatus.UNAUTHORIZED, exception.getMessage(), request, Map.of());
  }

  @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
  ResponseEntity<ErrorResponse> handleMalformedRequest(
      Exception exception,
      HttpServletRequest request) {
    return buildResponse(
        HttpStatus.BAD_REQUEST,
        "The request body or parameter format is invalid.",
        request,
        Map.of());
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  ResponseEntity<ErrorResponse> handleConflict(
      DataIntegrityViolationException exception,
      HttpServletRequest request) {
    LOGGER.warn("Database constraint rejected a request", exception);
    return buildResponse(
        HttpStatus.CONFLICT,
        "The request conflicts with an existing record.",
        request,
        Map.of());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ErrorResponse> handleValidation(
      MethodArgumentNotValidException exception,
      HttpServletRequest request) {
    Map<String, String> validationErrors = new LinkedHashMap<>();
    exception.getBindingResult().getFieldErrors()
        .forEach(error -> validationErrors.putIfAbsent(error.getField(), error.getDefaultMessage()));

    return buildResponse(
        HttpStatus.BAD_REQUEST,
        "One or more fields are invalid.",
        request,
        validationErrors);
  }

  @ExceptionHandler(DataAccessException.class)
  ResponseEntity<ErrorResponse> handleDatabase(
      DataAccessException exception,
      HttpServletRequest request) {
    LOGGER.error("Database operation failed", exception);
    return buildResponse(
        HttpStatus.SERVICE_UNAVAILABLE,
        "The database is temporarily unavailable.",
        request,
        Map.of());
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ErrorResponse> handleUnexpected(
      Exception exception,
      HttpServletRequest request) {
    LOGGER.error("Unhandled API error", exception);
    return buildResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred.",
        request,
        Map.of());
  }

  private ResponseEntity<ErrorResponse> buildResponse(
      HttpStatus status,
      String message,
      HttpServletRequest request,
      Map<String, String> validationErrors) {
    ErrorResponse response = new ErrorResponse(
        status.value(),
        status.getReasonPhrase(),
        message,
        request.getRequestURI(),
        Instant.now(),
        validationErrors);
    return ResponseEntity.status(status).body(response);
  }
}
