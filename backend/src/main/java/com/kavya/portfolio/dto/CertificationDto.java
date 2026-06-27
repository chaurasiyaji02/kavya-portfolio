package com.kavya.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;

public final class CertificationDto {
  private CertificationDto() {}

  public record Request(
      @NotBlank @Size(max = 180) String title,
      @NotBlank @Size(max = 180) String issuer,
      LocalDate issueDate,
      @Size(max = 180) String credentialId,
      @Size(max = 500) @Pattern(regexp = "^https?://.+") String credentialUrl,
      @PositiveOrZero int displayOrder) {}

  public record Response(
      Long id, String title, String issuer, LocalDate issueDate, String credentialId,
      String credentialUrl, int displayOrder, Instant createdAt, Instant updatedAt) {}
}
