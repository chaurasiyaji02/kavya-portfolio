package com.kavya.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;

public final class EducationDto {
  private EducationDto() {}

  public record Request(
      @NotBlank @Size(max = 180) String institution,
      @NotBlank @Size(max = 180) String degree,
      @Size(max = 180) String fieldOfStudy,
      @NotNull LocalDate startDate,
      LocalDate endDate,
      @Size(max = 1500) String description,
      @PositiveOrZero int displayOrder) {}

  public record Response(
      Long id, String institution, String degree, String fieldOfStudy,
      LocalDate startDate, LocalDate endDate, String description, int displayOrder,
      Instant createdAt, Instant updatedAt) {}
}
