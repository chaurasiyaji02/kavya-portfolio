package com.kavya.portfolio.dto;

import com.kavya.portfolio.entity.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;

public final class ProjectDto {
  private ProjectDto() {}

  public record Request(
      @NotBlank @Size(max = 160) String title,
      @NotBlank @Size(max = 180) @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$") String slug,
      @NotBlank @Size(max = 2000) String description,
      @Size(max = 500) @Pattern(regexp = "^https?://.+") String githubUrl,
      @Size(max = 500) @Pattern(regexp = "^https?://.+") String liveUrl,
      @NotNull ProjectStatus status,
      boolean featured,
      @PositiveOrZero int displayOrder,
      @NotEmpty @Size(max = 20) List<@NotBlank @Size(max = 100) String> technologies) {}

  public record Response(
      Long id, String title, String slug, String description, String githubUrl,
      String liveUrl, ProjectStatus status, boolean featured, int displayOrder,
      List<String> technologies, Instant createdAt, Instant updatedAt) {}
}
