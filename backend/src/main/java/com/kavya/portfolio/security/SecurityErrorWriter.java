package com.kavya.portfolio.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kavya.portfolio.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

@Component
public class SecurityErrorWriter {

  private final ObjectMapper objectMapper;

  public SecurityErrorWriter(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public void write(
      HttpServletRequest request,
      HttpServletResponse response,
      int status,
      String error,
      String message) throws IOException {
    response.setStatus(status);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    objectMapper.writeValue(response.getOutputStream(), new ErrorResponse(
        status,
        error,
        message,
        request.getRequestURI(),
        Instant.now(),
        Map.of()));
  }
}
