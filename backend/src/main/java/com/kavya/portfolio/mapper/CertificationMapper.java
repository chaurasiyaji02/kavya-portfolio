package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.CertificationDto.Request;
import com.kavya.portfolio.dto.CertificationDto.Response;
import com.kavya.portfolio.entity.Certification;
import org.springframework.stereotype.Component;

@Component
public class CertificationMapper implements CrudMapper<Certification, Request, Response> {
  public Certification toEntity(Request r) { Certification e = new Certification(); update(e, r); return e; }
  public void update(Certification e, Request r) {
    e.setTitle(r.title()); e.setIssuer(r.issuer()); e.setIssueDate(r.issueDate());
    e.setCredentialId(r.credentialId()); e.setCredentialUrl(r.credentialUrl());
    e.setDisplayOrder(r.displayOrder());
  }
  public Response toResponse(Certification e) {
    return new Response(e.getId(), e.getTitle(), e.getIssuer(), e.getIssueDate(),
        e.getCredentialId(), e.getCredentialUrl(), e.getDisplayOrder(),
        e.getCreatedAt(), e.getUpdatedAt());
  }
}
