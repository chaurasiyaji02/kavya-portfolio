package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "social_links")
public class SocialLink extends BaseEntity {

  @Column(nullable = false, length = 80)
  private String platform;
  @Column(name = "display_label", nullable = false, length = 120)
  private String displayLabel;
  @Column(nullable = false, length = 500)
  private String url;
  @Column(nullable = false)
  private boolean active;
  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  public String getPlatform() { return platform; }
  public void setPlatform(String platform) { this.platform = platform; }
  public String getDisplayLabel() { return displayLabel; }
  public void setDisplayLabel(String displayLabel) { this.displayLabel = displayLabel; }
  public String getUrl() { return url; }
  public void setUrl(String url) { this.url = url; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
