package com.kavya.portfolio.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class SkillDto {
  private SkillDto() {}

  public record Request(
      @NotBlank @Size(max = 100) String category,
      @NotBlank @Size(max = 120) String name,
      @Min(1) @Max(100) int proficiencyLevel,
      @PositiveOrZero int displayOrder) {}

  public record Response(
      Long id, String category, String name, int proficiencyLevel, int displayOrder,
      Instant createdAt, Instant updatedAt) {}
}
