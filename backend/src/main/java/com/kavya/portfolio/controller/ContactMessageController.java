package com.kavya.portfolio.controller;

import com.kavya.portfolio.dto.ApiResponse;
import com.kavya.portfolio.dto.ContactMessageDto.CreateRequest;
import com.kavya.portfolio.dto.ContactMessageDto.Response;
import com.kavya.portfolio.dto.ContactMessageDto.UpdateRequest;
import com.kavya.portfolio.service.ContactMessageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping(ApiPaths.V1) @Tag(name = "Contact Messages")
public class ContactMessageController {
  private final ContactMessageService service;
  public ContactMessageController(ContactMessageService service) { this.service = service; }
  @PostMapping("/contact-messages") @ResponseStatus(HttpStatus.CREATED)
  public ApiResponse<Response> create(@Valid @RequestBody CreateRequest request) { return ApiResponse.of(service.create(request)); }
  @GetMapping("/admin/contact-messages") public ApiResponse<List<Response>> all() { return ApiResponse.of(service.findAll()); }
  @GetMapping("/admin/contact-messages/{id}") public ApiResponse<Response> one(@PathVariable Long id) { return ApiResponse.of(service.findById(id)); }
  @PutMapping("/admin/contact-messages/{id}")
  public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody UpdateRequest request) { return ApiResponse.of(service.update(id, request)); }
  @DeleteMapping("/admin/contact-messages/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) { service.delete(id); }
}
