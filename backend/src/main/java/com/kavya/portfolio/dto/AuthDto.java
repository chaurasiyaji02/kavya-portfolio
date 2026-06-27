package com.kavya.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class AuthDto {

  private AuthDto() {
  }

  public record LoginRequest(
      @NotBlank @Email @Size(max = 254) String email,
      @NotBlank @Size(max = 200) String password) {
  }

  public record LoginResponse(
      String token,
      String tokenType,
      Instant expiresAt,
      String email,
      String role) {
  }
}
