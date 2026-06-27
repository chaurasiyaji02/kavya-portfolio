package com.kavya.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class ResumeProfileDto {
  private ResumeProfileDto() {}

  public record Request(
      @NotBlank @Size(max = 160) String fullName,
      @NotBlank @Size(max = 200) String headline,
      @NotBlank @Size(max = 3000) String summary,
      @NotBlank @Email @Size(max = 254) String email,
      @Size(max = 40) String phone,
      @Size(max = 160) String location,
      @Size(max = 500) @Pattern(regexp = "^https?://.+") String resumeUrl,
      @Size(max = 500) @Pattern(regexp = "^https?://.+") String photoUrl,
      boolean active) {}

  public record Response(
      Long id, String fullName, String headline, String summary, String email,
      String phone, String location, String resumeUrl, String photoUrl, boolean active,
      Instant createdAt, Instant updatedAt) {}
}
