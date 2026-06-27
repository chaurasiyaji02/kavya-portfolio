package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.CertificationDto.Request;
import com.kavya.portfolio.dto.CertificationDto.Response;
import com.kavya.portfolio.service.CertificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Certifications")
public class CertificationController {
  private final CertificationService service;
  public CertificationController(CertificationService service) { this.service = service; }
  @GetMapping("/certifications") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/certifications/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PostMapping("/admin/certifications") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/certifications/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/certifications/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
