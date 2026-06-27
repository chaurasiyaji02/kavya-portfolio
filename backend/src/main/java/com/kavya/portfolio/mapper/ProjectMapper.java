package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.ProjectDto.Request;
import com.kavya.portfolio.dto.ProjectDto.Response;
import com.kavya.portfolio.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper implements CrudMapper<Project, Request, Response> {
  public Project toEntity(Request request) { Project entity = new Project(); update(entity, request); return entity; }
  public void update(Project e, Request r) {
    e.setTitle(r.title()); e.setSlug(r.slug()); e.setDescription(r.description());
    e.setGithubUrl(r.githubUrl()); e.setLiveUrl(r.liveUrl()); e.setImageUrl(r.imageUrl());
    e.setStatus(r.status());
    e.setFeatured(r.featured()); e.setDisplayOrder(r.displayOrder()); e.setTechnologies(r.technologies());
  }
  public Response toResponse(Project e) {
    return new Response(e.getId(), e.getTitle(), e.getSlug(), e.getDescription(),
        e.getGithubUrl(), e.getLiveUrl(), e.getImageUrl(), e.getStatus(), e.isFeatured(),
        e.getDisplayOrder(), ListCopy.of(e.getTechnologies()), e.getCreatedAt(), e.getUpdatedAt());
  }
}
