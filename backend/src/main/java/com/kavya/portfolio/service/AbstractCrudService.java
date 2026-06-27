package com.kavya.portfolio.service;

import com.kavya.portfolio.entity.BaseEntity;
import com.kavya.portfolio.exception.ResourceNotFoundException;
import com.kavya.portfolio.mapper.CrudMapper;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractCrudService<E extends BaseEntity, Q, S> {

  private final JpaRepository<E, Long> repository;
  private final CrudMapper<E, Q, S> mapper;
  private final String resourceName;
  private final Sort sort;

  protected AbstractCrudService(
      JpaRepository<E, Long> repository,
      CrudMapper<E, Q, S> mapper,
      String resourceName,
      Sort sort) {
    this.repository = repository;
    this.mapper = mapper;
    this.resourceName = resourceName;
    this.sort = sort;
  }

  @Transactional(readOnly = true)
  public List<S> findAll() {
    return repository.findAll(sort).stream().map(mapper::toResponse).toList();
  }

  @Transactional(readOnly = true)
  public S findById(Long id) {
    return mapper.toResponse(requireEntity(id));
  }

  @Transactional
  public S create(Q request) {
    validate(request);
    return mapper.toResponse(repository.save(mapper.toEntity(request)));
  }

  @Transactional
  public S update(Long id, Q request) {
    validate(request);
    E entity = requireEntity(id);
    mapper.update(entity, request);
    return mapper.toResponse(repository.save(entity));
  }

  @Transactional
  public void delete(Long id) {
    repository.delete(requireEntity(id));
  }

  protected void validate(Q request) {
  }

  protected E requireEntity(Long id) {
    return repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(resourceName + " " + id + " was not found."));
  }
}
