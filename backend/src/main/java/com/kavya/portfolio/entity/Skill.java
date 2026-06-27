package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill extends BaseEntity {

  @Column(nullable = false, length = 100)
  private String category;

  @Column(nullable = false, length = 120)
  private String name;

  @Column(name = "proficiency_level", nullable = false)
  private int proficiencyLevel;

  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public int getProficiencyLevel() { return proficiencyLevel; }
  public void setProficiencyLevel(int proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
