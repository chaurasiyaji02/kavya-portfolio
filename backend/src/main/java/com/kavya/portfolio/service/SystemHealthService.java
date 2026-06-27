package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.HealthResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class SystemHealthService {

  private final JdbcTemplate jdbcTemplate;

  public SystemHealthService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public HealthResponse check() {
    String database = jdbcTemplate.queryForObject("select current_database()", String.class);
    return new HealthResponse("UP", database, "kavya-portfolio-backend");
  }
}
