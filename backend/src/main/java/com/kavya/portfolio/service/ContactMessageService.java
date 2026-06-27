package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.ContactMessageDto.CreateRequest;
import com.kavya.portfolio.dto.ContactMessageDto.Response;
import com.kavya.portfolio.dto.ContactMessageDto.UpdateRequest;
import com.kavya.portfolio.entity.ContactMessage;
import com.kavya.portfolio.exception.ResourceNotFoundException;
import com.kavya.portfolio.mapper.ContactMessageMapper;
import com.kavya.portfolio.repository.ContactMessageRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactMessageService {
  private final ContactMessageRepository repository;
  private final ContactMessageMapper mapper;
  public ContactMessageService(ContactMessageRepository repository, ContactMessageMapper mapper) {
    this.repository = repository; this.mapper = mapper;
  }
  @Transactional public Response create(CreateRequest request) {
    return mapper.toResponse(repository.save(mapper.toEntity(request)));
  }
  @Transactional(readOnly = true) public List<Response> findAll() {
    return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().map(mapper::toResponse).toList();
  }
  @Transactional(readOnly = true) public Response findById(Long id) { return mapper.toResponse(require(id)); }
  @Transactional public Response update(Long id, UpdateRequest request) {
    ContactMessage entity = require(id); entity.setRead(request.read());
    return mapper.toResponse(repository.save(entity));
  }
  @Transactional public void delete(Long id) { repository.delete(require(id)); }
  private ContactMessage require(Long id) {
    return repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Contact message " + id + " was not found."));
  }
}
