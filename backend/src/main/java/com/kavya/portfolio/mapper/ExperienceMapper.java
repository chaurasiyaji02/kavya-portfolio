package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.ExperienceDto.Request;
import com.kavya.portfolio.dto.ExperienceDto.Response;
import com.kavya.portfolio.entity.Experience;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ExperienceMapper implements CrudMapper<Experience, Request, Response> {
  public Experience toEntity(Request r) { Experience e = new Experience(); update(e, r); return e; }
  public void update(Experience e, Request r) {
    e.setOrganization(r.organization()); e.setRole(r.role()); e.setLocation(r.location());
    e.setStartDate(r.startDate()); e.setEndDate(r.endDate()); e.setCurrentRole(r.currentRole());
    e.setDescription(r.description()); e.setDisplayOrder(r.displayOrder());
    e.setHighlights(r.highlights() == null ? List.of() : r.highlights());
  }
  public Response toResponse(Experience e) {
    return new Response(e.getId(), e.getOrganization(), e.getRole(), e.getLocation(),
        e.getStartDate(), e.getEndDate(), e.isCurrentRole(), e.getDescription(),
        e.getDisplayOrder(), ListCopy.of(e.getHighlights()), e.getCreatedAt(), e.getUpdatedAt());
  }
}
