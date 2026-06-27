package com.kavya.portfolio.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experiences")
public class Experience extends BaseEntity {

  @Column(nullable = false, length = 180)
  private String organization;
  @Column(nullable = false, length = 160)
  private String role;
  @Column(length = 160)
  private String location;
  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;
  @Column(name = "end_date")
  private LocalDate endDate;
  @Column(name = "is_current", nullable = false)
  private boolean currentRole;
  @Column(length = 2000)
  private String description;
  @Column(name = "display_order", nullable = false)
  private int displayOrder;
  @ElementCollection
  @CollectionTable(name = "experience_highlights", joinColumns = @JoinColumn(name = "experience_id"))
  @OrderColumn(name = "display_order")
  @Column(name = "highlight", nullable = false, length = 500)
  private List<String> highlights = new ArrayList<>();

  public String getOrganization() { return organization; }
  public void setOrganization(String organization) { this.organization = organization; }
  public String getRole() { return role; }
  public void setRole(String role) { this.role = role; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public LocalDate getStartDate() { return startDate; }
  public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
  public LocalDate getEndDate() { return endDate; }
  public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
  public boolean isCurrentRole() { return currentRole; }
  public void setCurrentRole(boolean currentRole) { this.currentRole = currentRole; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
  public List<String> getHighlights() { return highlights; }
  public void setHighlights(List<String> highlights) { this.highlights = new ArrayList<>(highlights); }
}
