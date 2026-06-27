package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.SocialLinkDto.Request;
import com.kavya.portfolio.dto.SocialLinkDto.Response;
import com.kavya.portfolio.entity.SocialLink;
import org.springframework.stereotype.Component;

@Component
public class SocialLinkMapper implements CrudMapper<SocialLink, Request, Response> {
  public SocialLink toEntity(Request r) { SocialLink e = new SocialLink(); update(e, r); return e; }
  public void update(SocialLink e, Request r) {
    e.setPlatform(r.platform()); e.setDisplayLabel(r.displayLabel()); e.setUrl(r.url());
    e.setActive(r.active()); e.setDisplayOrder(r.displayOrder());
  }
  public Response toResponse(SocialLink e) {
    return new Response(e.getId(), e.getPlatform(), e.getDisplayLabel(), e.getUrl(),
        e.isActive(), e.getDisplayOrder(), e.getCreatedAt(), e.getUpdatedAt());
  }
}
