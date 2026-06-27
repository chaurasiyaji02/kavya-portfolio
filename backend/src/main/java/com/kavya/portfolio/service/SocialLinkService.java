package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.SocialLinkDto.Request;
import com.kavya.portfolio.dto.SocialLinkDto.Response;
import com.kavya.portfolio.entity.SocialLink;
import com.kavya.portfolio.exception.ResourceNotFoundException;
import com.kavya.portfolio.mapper.SocialLinkMapper;
import com.kavya.portfolio.repository.SocialLinkRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SocialLinkService extends AbstractCrudService<SocialLink, Request, Response> {
  private final SocialLinkRepository repository;
  private final SocialLinkMapper mapper;
  public SocialLinkService(SocialLinkRepository repository, SocialLinkMapper mapper) {
    super(repository, mapper, "Social link", Sort.by("displayOrder").and(Sort.by("id")));
    this.repository = repository; this.mapper = mapper;
  }
  @Transactional(readOnly = true)
  public List<Response> findActive() {
    return repository.findByActiveTrueOrderByDisplayOrderAscIdAsc().stream().map(mapper::toResponse).toList();
  }
  @Transactional(readOnly = true)
  public Response findActiveById(Long id) {
    return repository.findByIdAndActiveTrue(id).map(mapper::toResponse)
        .orElseThrow(() -> new ResourceNotFoundException("Social link " + id + " was not found."));
  }
}
