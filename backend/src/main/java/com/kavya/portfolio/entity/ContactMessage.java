package com.kavya.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "contact_messages")
public class ContactMessage extends BaseEntity {

  @Column(nullable = false, length = 160)
  private String name;
  @Column(nullable = false, length = 254)
  private String email;
  @Column(nullable = false, length = 200)
  private String subject;
  @Column(nullable = false, length = 5000)
  private String message;
  @Column(name = "is_read", nullable = false)
  private boolean read;

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getSubject() { return subject; }
  public void setSubject(String subject) { this.subject = subject; }
  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }
  public boolean isRead() { return read; }
  public void setRead(boolean read) { this.read = read; }
}
