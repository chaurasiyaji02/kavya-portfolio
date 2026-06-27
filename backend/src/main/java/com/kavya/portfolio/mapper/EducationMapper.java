package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.EducationDto.Request;
import com.kavya.portfolio.dto.EducationDto.Response;
import com.kavya.portfolio.entity.Education;
import org.springframework.stereotype.Component;

@Component
public class EducationMapper implements CrudMapper<Education, Request, Response> {
  public Education toEntity(Request r) { Education e = new Education(); update(e, r); return e; }
  public void update(Education e, Request r) {
    e.setInstitution(r.institution()); e.setDegree(r.degree()); e.setFieldOfStudy(r.fieldOfStudy());
    e.setStartDate(r.startDate()); e.setEndDate(r.endDate());
    e.setDescription(r.description()); e.setDisplayOrder(r.displayOrder());
  }
  public Response toResponse(Education e) {
    return new Response(e.getId(), e.getInstitution(), e.getDegree(), e.getFieldOfStudy(),
        e.getStartDate(), e.getEndDate(), e.getDescription(), e.getDisplayOrder(),
        e.getCreatedAt(), e.getUpdatedAt());
  }
}
