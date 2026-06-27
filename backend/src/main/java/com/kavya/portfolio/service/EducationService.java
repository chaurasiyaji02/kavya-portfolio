package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.EducationDto.Request;
import com.kavya.portfolio.dto.EducationDto.Response;
import com.kavya.portfolio.entity.Education;
import com.kavya.portfolio.exception.BadRequestException;
import com.kavya.portfolio.mapper.EducationMapper;
import com.kavya.portfolio.repository.EducationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EducationService extends AbstractCrudService<Education, Request, Response> {
  public EducationService(EducationRepository repository, EducationMapper mapper) {
    super(repository, mapper, "Education", Sort.by("displayOrder").and(Sort.by("id")));
  }
  @Override protected void validate(Request request) {
    if (request.endDate() != null && request.endDate().isBefore(request.startDate())) {
      throw new BadRequestException("Education end date cannot be before its start date.");
    }
  }
}
