package com.kavya.portfolio.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

  @Column(nullable = false, length = 160)
  private String title;

  @Column(nullable = false, unique = true, length = 180)
  private String slug;

  @Column(nullable = false, length = 2000)
  private String description;

  @Column(name = "github_url", length = 500)
  private String githubUrl;

  @Column(name = "live_url", length = 500)
  private String liveUrl;

  @Column(name = "image_url", length = 500)
  private String imageUrl;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 30)
  private ProjectStatus status;

  @Column(nullable = false)
  private boolean featured;

  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  @ElementCollection
  @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
  @OrderColumn(name = "display_order")
  @Column(name = "technology", nullable = false, length = 100)
  private List<String> technologies = new ArrayList<>();

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getGithubUrl() { return githubUrl; }
  public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
  public String getLiveUrl() { return liveUrl; }
  public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public ProjectStatus getStatus() { return status; }
  public void setStatus(ProjectStatus status) { this.status = status; }
  public boolean isFeatured() { return featured; }
  public void setFeatured(boolean featured) { this.featured = featured; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
  public List<String> getTechnologies() { return technologies; }
  public void setTechnologies(List<String> technologies) { this.technologies = new ArrayList<>(technologies); }
}
