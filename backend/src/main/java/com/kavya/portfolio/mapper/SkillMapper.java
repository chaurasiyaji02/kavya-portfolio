package com.kavya.portfolio.mapper;

import com.kavya.portfolio.dto.SkillDto.Request;
import com.kavya.portfolio.dto.SkillDto.Response;
import com.kavya.portfolio.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper implements CrudMapper<Skill, Request, Response> {
  public Skill toEntity(Request r) { Skill e = new Skill(); update(e, r); return e; }
  public void update(Skill e, Request r) {
    e.setCategory(r.category()); e.setName(r.name());
    e.setProficiencyLevel(r.proficiencyLevel()); e.setDisplayOrder(r.displayOrder());
  }
  public Response toResponse(Skill e) {
    return new Response(e.getId(), e.getCategory(), e.getName(), e.getProficiencyLevel(),
        e.getDisplayOrder(), e.getCreatedAt(), e.getUpdatedAt());
  }
}
