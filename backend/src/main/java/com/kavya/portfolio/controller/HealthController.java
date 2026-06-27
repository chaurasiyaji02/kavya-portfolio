package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.HealthResponse;
import com.kavya.portfolio.service.SystemHealthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.V1)
@Tag(name = "Health")
public class HealthController {

  private final SystemHealthService systemHealthService;

  public HealthController(SystemHealthService systemHealthService) {
    this.systemHealthService = systemHealthService;
  }

  @GetMapping("/health")
  @Operation(summary = "Check API and database health")
  public ApiResponse<HealthResponse> health() {
    return ApiResponse.of(systemHealthService.check());
  }
}
