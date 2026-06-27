package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.EducationDto.Request;
import com.kavya.portfolio.dto.EducationDto.Response;
import com.kavya.portfolio.service.EducationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Education")
public class EducationController {
  private final EducationService service;
  public EducationController(EducationService service) { this.service = service; }
  @GetMapping("/education") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/education/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PostMapping("/admin/education") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/education/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/education/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
