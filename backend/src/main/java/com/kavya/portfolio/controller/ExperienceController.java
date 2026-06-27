package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.ExperienceDto.Request;
import com.kavya.portfolio.dto.ExperienceDto.Response;
import com.kavya.portfolio.service.ExperienceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Experience")
public class ExperienceController {
  private final ExperienceService service;
  public ExperienceController(ExperienceService service) { this.service = service; }
  @GetMapping("/experiences") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/experiences/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PostMapping("/admin/experiences") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/experiences/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/experiences/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
