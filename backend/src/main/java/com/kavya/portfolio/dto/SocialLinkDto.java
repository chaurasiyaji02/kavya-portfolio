package com.kavya.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class SocialLinkDto {
  private SocialLinkDto() {}

  public record Request(
      @NotBlank @Size(max = 80) String platform,
      @NotBlank @Size(max = 120) String displayLabel,
      @NotBlank @Size(max = 500) @Pattern(regexp = "^https?://.+") String url,
      boolean active,
      @PositiveOrZero int displayOrder) {}

  public record Response(
      Long id, String platform, String displayLabel, String url, boolean active,
      int displayOrder, Instant createdAt, Instant updatedAt) {}
}
