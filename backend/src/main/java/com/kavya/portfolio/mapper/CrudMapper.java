package com.kavya.portfolio.mapper;

public interface CrudMapper<E, Q, S> {
  E toEntity(Q request);
  void update(E entity, Q request);
  S toResponse(E entity);
}
