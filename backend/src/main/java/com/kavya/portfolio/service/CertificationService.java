package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.CertificationDto.Request;
import com.kavya.portfolio.dto.CertificationDto.Response;
import com.kavya.portfolio.entity.Certification;
import com.kavya.portfolio.mapper.CertificationMapper;
import com.kavya.portfolio.repository.CertificationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CertificationService extends AbstractCrudService<Certification, Request, Response> {
  public CertificationService(CertificationRepository repository, CertificationMapper mapper) {
    super(repository, mapper, "Certification", Sort.by("displayOrder").and(Sort.by("id")));
  }
}
