package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.ExperienceDto.Request;
import com.kavya.portfolio.dto.ExperienceDto.Response;
import com.kavya.portfolio.entity.Experience;
import com.kavya.portfolio.exception.BadRequestException;
import com.kavya.portfolio.mapper.ExperienceMapper;
import com.kavya.portfolio.repository.ExperienceRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ExperienceService extends AbstractCrudService<Experience, Request, Response> {
  public ExperienceService(ExperienceRepository repository, ExperienceMapper mapper) {
    super(repository, mapper, "Experience", Sort.by("displayOrder").and(Sort.by("id")));
  }
  @Override protected void validate(Request request) {
    if (request.currentRole() && request.endDate() != null) {
      throw new BadRequestException("A current role cannot have an end date.");
    }
    if (request.endDate() != null && request.endDate().isBefore(request.startDate())) {
      throw new BadRequestException("Experience end date cannot be before its start date.");
    }
  }
}
