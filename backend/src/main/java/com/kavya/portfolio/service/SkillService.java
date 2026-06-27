package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.SkillDto.Request;
import com.kavya.portfolio.dto.SkillDto.Response;
import com.kavya.portfolio.entity.Skill;
import com.kavya.portfolio.mapper.SkillMapper;
import com.kavya.portfolio.repository.SkillRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SkillService extends AbstractCrudService<Skill, Request, Response> {
  public SkillService(SkillRepository repository, SkillMapper mapper) {
    super(repository, mapper, "Skill", Sort.by("displayOrder").and(Sort.by("id")));
  }
}
