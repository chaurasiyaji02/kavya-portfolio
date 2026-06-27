package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.ResumeProfileDto.Request;
import com.kavya.portfolio.dto.ResumeProfileDto.Response;
import com.kavya.portfolio.entity.ResumeProfile;
import com.kavya.portfolio.exception.ResourceNotFoundException;
import com.kavya.portfolio.mapper.ResumeProfileMapper;
import com.kavya.portfolio.repository.ResumeProfileRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResumeProfileService extends AbstractCrudService<ResumeProfile, Request, Response> {
  private final ResumeProfileRepository repository;
  private final ResumeProfileMapper mapper;
  public ResumeProfileService(ResumeProfileRepository repository, ResumeProfileMapper mapper) {
    super(repository, mapper, "Resume profile", Sort.by("id"));
    this.repository = repository; this.mapper = mapper;
  }
  @Transactional(readOnly = true)
  public Response findActive() {
    return repository.findFirstByActiveTrueOrderByIdAsc().map(mapper::toResponse)
        .orElseThrow(() -> new ResourceNotFoundException("Active resume profile was not found."));
  }
}
