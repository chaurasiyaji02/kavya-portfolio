package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.SampleResponse;
import com.kavya.portfolio.service.SampleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.V1)
@Tag(name = "Connection")
public class SampleController {

  private final SampleService sampleService;

  public SampleController(SampleService sampleService) {
    this.sampleService = sampleService;
  }

  @GetMapping("/sample")
  @Operation(summary = "Verify frontend-to-backend connectivity")
  public ApiResponse<SampleResponse> sample() {
    return ApiResponse.of(sampleService.getConnectionMessage());
  }
}
