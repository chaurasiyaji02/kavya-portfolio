package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "certifications")
public class Certification extends BaseEntity {

  @Column(nullable = false, length = 180)
  private String title;
  @Column(nullable = false, length = 180)
  private String issuer;
  @Column(name = "issue_date")
  private LocalDate issueDate;
  @Column(name = "credential_id", length = 180)
  private String credentialId;
  @Column(name = "credential_url", length = 500)
  private String credentialUrl;
  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getIssuer() { return issuer; }
  public void setIssuer(String issuer) { this.issuer = issuer; }
  public LocalDate getIssueDate() { return issueDate; }
  public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
  public String getCredentialId() { return credentialId; }
  public void setCredentialId(String credentialId) { this.credentialId = credentialId; }
  public String getCredentialUrl() { return credentialUrl; }
  public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }
  public int getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
