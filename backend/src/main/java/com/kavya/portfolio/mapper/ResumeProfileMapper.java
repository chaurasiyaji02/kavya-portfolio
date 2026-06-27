package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.ResumeProfileDto.Request;
import com.kavya.portfolio.dto.ResumeProfileDto.Response;
import com.kavya.portfolio.entity.ResumeProfile;
import org.springframework.stereotype.Component;

@Component
public class ResumeProfileMapper implements CrudMapper<ResumeProfile, Request, Response> {
  public ResumeProfile toEntity(Request r) { ResumeProfile e = new ResumeProfile(); update(e, r); return e; }
  public void update(ResumeProfile e, Request r) {
    e.setFullName(r.fullName()); e.setHeadline(r.headline()); e.setSummary(r.summary());
    e.setEmail(r.email()); e.setPhone(r.phone()); e.setLocation(r.location());
    e.setResumeUrl(r.resumeUrl()); e.setPhotoUrl(r.photoUrl()); e.setActive(r.active());
  }
  public Response toResponse(ResumeProfile e) {
    return new Response(e.getId(), e.getFullName(), e.getHeadline(), e.getSummary(),
        e.getEmail(), e.getPhone(), e.getLocation(), e.getResumeUrl(), e.getPhotoUrl(),
        e.isActive(), e.getCreatedAt(), e.getUpdatedAt());
  }
}
