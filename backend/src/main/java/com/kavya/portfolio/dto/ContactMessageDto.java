package com.kavya.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class ContactMessageDto {
  private ContactMessageDto() {}

  public record CreateRequest(
      @NotBlank @Size(max = 160) String name,
      @NotBlank @Email @Size(max = 254) String email,
      @NotBlank @Size(max = 200) String subject,
      @NotBlank @Size(max = 5000) String message) {}

  public record UpdateRequest(boolean read) {}

  public record Response(
      Long id, String name, String email, String subject, String message, boolean read,
      Instant createdAt, Instant updatedAt) {}
}
