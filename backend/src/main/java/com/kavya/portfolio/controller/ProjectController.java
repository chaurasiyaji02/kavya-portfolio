package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.ProjectDto.Request;
import com.kavya.portfolio.dto.ProjectDto.Response;
import com.kavya.portfolio.service.ProjectService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Projects")
public class ProjectController {
  private final ProjectService service;
  public ProjectController(ProjectService service) { this.service = service; }
  @GetMapping("/projects") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/projects/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PostMapping("/admin/projects") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/projects/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/projects/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
