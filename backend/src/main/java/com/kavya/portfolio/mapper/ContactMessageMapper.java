package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.ContactMessageDto.CreateRequest;
import com.kavya.portfolio.dto.ContactMessageDto.Response;
import com.kavya.portfolio.entity.ContactMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageMapper {
  public ContactMessage toEntity(CreateRequest r) {
    ContactMessage e = new ContactMessage();
    e.setName(r.name()); e.setEmail(r.email()); e.setSubject(r.subject());
    e.setMessage(r.message()); e.setRead(false);
    return e;
  }
  public Response toResponse(ContactMessage e) {
    return new Response(e.getId(), e.getName(), e.getEmail(), e.getSubject(),
        e.getMessage(), e.isRead(), e.getCreatedAt(), e.getUpdatedAt());
  }
}
