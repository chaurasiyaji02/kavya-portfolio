package com.kavya.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public final class ExperienceDto {
  private ExperienceDto() {}

  public record Request(
      @NotBlank @Size(max = 180) String organization,
      @NotBlank @Size(max = 160) String role,
      @Size(max = 160) String location,
      @NotNull LocalDate startDate,
      LocalDate endDate,
      boolean currentRole,
      @Size(max = 2000) String description,
      @PositiveOrZero int displayOrder,
      @Size(max = 20) List<@NotBlank @Size(max = 500) String> highlights) {}

  public record Response(
      Long id, String organization, String role, String location, LocalDate startDate,
      LocalDate endDate, boolean currentRole, String description, int displayOrder,
      List<String> highlights, Instant createdAt, Instant updatedAt) {}
}
