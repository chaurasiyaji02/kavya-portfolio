package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.ResumeProfileDto.Request;
import com.kavya.portfolio.dto.ResumeProfileDto.Response;
import com.kavya.portfolio.service.ResumeProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Resume Profile")
public class ResumeProfileController {
  private final ResumeProfileService service;
  public ResumeProfileController(ResumeProfileService service) { this.service = service; }
  @GetMapping("/resume-profile") public ApiResponse<Response> active() { return ApiResponse.of(service.findActive()); }
  @GetMapping("/admin/resume-profiles") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/admin/resume-profiles/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PostMapping("/admin/resume-profiles") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/resume-profiles/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/resume-profiles/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
