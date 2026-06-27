package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.ProjectDto.Request;
import com.kavya.portfolio.dto.ProjectDto.Response;
import com.kavya.portfolio.mapper.ProjectMapper;
import com.kavya.portfolio.repository.ProjectRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProjectService extends AbstractCrudService<com.kavya.portfolio.entity.Project, Request, Response> {
  public ProjectService(ProjectRepository repository, ProjectMapper mapper) {
    super(repository, mapper, "Project", Sort.by("displayOrder").ascending().and(Sort.by("id")));
  }
}
