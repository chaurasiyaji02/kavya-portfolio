package com.kavya.portfolio.service;

import com.kavya.portfolio.config.SecurityProperties;
import com.kavya.portfolio.entity.AdminRole;
import com.kavya.portfolio.entity.AdminUser;
import com.kavya.portfolio.repository.AdminUserRepository;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Component
public class AdminUserSeeder implements ApplicationRunner {

  private static final Logger LOGGER = LoggerFactory.getLogger(AdminUserSeeder.class);

  private final AdminUserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final SecurityProperties properties;

  public AdminUserSeeder(
      AdminUserRepository repository,
      PasswordEncoder passwordEncoder,
      SecurityProperties properties) {
    this.repository = repository;
    this.passwordEncoder = passwordEncoder;
    this.properties = properties;
  }

  @Override
  @Transactional
  public void run(ApplicationArguments args) {
    boolean hasEmail = StringUtils.hasText(properties.adminEmail());
    boolean hasPassword = StringUtils.hasText(properties.adminPassword());
    if (!hasEmail && !hasPassword) {
      LOGGER.warn("Admin seed skipped because ADMIN_EMAIL and ADMIN_PASSWORD are not configured.");
      return;
    }
    if (!hasEmail || !hasPassword) {
      throw new IllegalStateException(
          "ADMIN_EMAIL and ADMIN_PASSWORD must both be configured to seed an admin user.");
    }
    if (properties.adminPassword().length() < 12) {
      throw new IllegalStateException("ADMIN_PASSWORD must contain at least 12 characters.");
    }

    String email = properties.adminEmail().trim().toLowerCase(Locale.ROOT);
    if (repository.findByEmailIgnoreCase(email).isPresent()) {
      return;
    }

    AdminUser admin = new AdminUser();
    admin.setEmail(email);
    admin.setPasswordHash(passwordEncoder.encode(properties.adminPassword()));
    admin.setRole(AdminRole.ADMIN);
    repository.save(admin);
    LOGGER.info("Seeded admin account for {}", email);
  }
}
