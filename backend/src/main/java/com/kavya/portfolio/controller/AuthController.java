package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.AuthDto.LoginRequest;
import com.kavya.portfolio.dto.AuthDto.LoginResponse;
import com.kavya.portfolio.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.V1 + "/auth")
@Tag(name = "Authentication")
public class AuthController {

  private final AuthService service;

  public AuthController(AuthService service) {
    this.service = service;
  }

  @PostMapping("/login")
  @Operation(summary = "Authenticate an administrator and issue a short-lived JWT")
  public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    return ApiResponse.of(service.login(request));
  }
}
