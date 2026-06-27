package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.SocialLinkDto.Request;
import com.kavya.portfolio.dto.SocialLinkDto.Response;
import com.kavya.portfolio.service.SocialLinkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Social Links")
public class SocialLinkController {
  private final SocialLinkService service;
  public SocialLinkController(SocialLinkService service) { this.service = service; }
  @GetMapping("/social-links") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findActive()); }
  @GetMapping("/social-links/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findActiveById(id)); }
  @GetMapping("/admin/social-links") public ApiResponse<List<Response>> adminAll() { return ApiResponse.of(service.findAll()); }
  @PostMapping("/admin/social-links") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody Request request) { return ApiResponse.of(service.create(request)); }
  @PutMapping("/admin/social-links/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/social-links/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
