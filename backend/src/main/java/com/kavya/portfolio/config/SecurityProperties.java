package com.kavya.portfolio.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security")
public record SecurityProperties(
    String jwtSecret,
    Duration jwtExpiration,
    String adminEmail,
    String adminPassword) {
}
