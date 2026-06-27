package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "education")
public class Education extends BaseEntity {

  @Column(nullable = false, length = 180)
  private String institution;
  @Column(nullable = false, length = 180)
  private String degree;
  @Column(name = "field_of_study", length = 180)
  private String fieldOfStudy;
  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;
  @Column(name = "end_date")
  private LocalDate endDate;
  @Column(length = 1500)
  private String description;
  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  public String getInstitution() { return institution; }
  public void setInstitution(String institution) { this.institution = institution; }
  public String getDegree() { return degree; }
  public void setDegree(String degree) { this.degree = degree; }
  public String getFieldOfStudy() { return fieldOfStudy; }
  public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
  public LocalDate getStartDate() { return startDate; }
  public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
  public LocalDate getEndDate() { return endDate; }
  public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
