package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "resume_profiles")
public class ResumeProfile extends BaseEntity {

  @Column(name = "full_name", nullable = false, length = 160)
  private String fullName;
  @Column(nullable = false, length = 200)
  private String headline;
  @Column(nullable = false, length = 3000)
  private String summary;
  @Column(nullable = false, length = 254)
  private String email;
  @Column(length = 40)
  private String phone;
  @Column(length = 160)
  private String location;
  @Column(name = "resume_url", length = 500)
  private String resumeUrl;
  @Column(name = "photo_url", length = 500)
  private String photoUrl;
  @Column(nullable = false)
  private boolean active;

  public String getFullName() { return fullName; }
  public void setFullName(String fullName) { this.fullName = fullName; }
  public String getHeadline() { return headline; }
  public void setHeadline(String headline) { this.headline = headline; }
  public String getSummary() { return summary; }
  public void setSummary(String summary) { this.summary = summary; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public String getResumeUrl() { return resumeUrl; }
  public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
  public String getPhotoUrl() { return photoUrl; }
  public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
}
