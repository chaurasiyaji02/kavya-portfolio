package com.kavya.portfolio;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PortfolioApplicationIntegrationTest {

  private static final EmbeddedPostgres POSTGRES = startPostgres();

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @DynamicPropertySource
  static void databaseProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", PortfolioApplicationIntegrationTest::jdbcUrl);
    registry.add("spring.datasource.username", () -> "postgres");
    registry.add("spring.datasource.password", () -> "postgres");
  }

  @AfterAll
  static void stopPostgres() throws IOException {
    POSTGRES.close();
  }

  @Test
  void connectsToPostgresAndServesVersionedApi() {
    String database = jdbcTemplate.queryForObject("select current_database()", String.class);
    assertThat(database).isEqualTo("postgres");

    ResponseEntity<JsonNode> health = restTemplate.getForEntity("/api/v1/health", JsonNode.class);
    assertThat(health.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(health.getBody()).isNotNull();
    assertThat(health.getBody().path("data").path("status").asText()).isEqualTo("UP");
    assertThat(health.getBody().path("data").path("database").asText()).isEqualTo("postgres");

    ResponseEntity<JsonNode> sample = restTemplate.getForEntity("/api/v1/sample", JsonNode.class);
    assertThat(sample.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(sample.getBody()).isNotNull();
    assertThat(sample.getBody().path("data").path("status").asText()).isEqualTo("connected");
    assertThat(sample.getBody().path("data").path("apiVersion").asText()).isEqualTo("v1");
  }

  @Test
  void exposesOpenApiAndAllowsConfiguredFrontendOrigin() {
    ResponseEntity<JsonNode> openApi = restTemplate.getForEntity("/api-docs", JsonNode.class);
    assertThat(openApi.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(openApi.getBody()).isNotNull();
    assertThat(openApi.getBody().path("info").path("title").asText())
        .isEqualTo("Kavya Portfolio API");
    assertThat(openApi.getBody().path("paths").has("/api/v1/projects")).isTrue();
    assertThat(openApi.getBody().path("paths").has("/api/v1/contact-messages")).isTrue();

    HttpHeaders headers = new HttpHeaders();
    headers.setOrigin("http://localhost:5173");
    headers.setAccessControlRequestMethod(HttpMethod.GET);
    RequestEntity<Void> preflight = new RequestEntity<>(headers, HttpMethod.OPTIONS, java.net.URI.create("/api/v1/sample"));

    ResponseEntity<Void> corsResponse = restTemplate.exchange(preflight, Void.class);
    assertThat(corsResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(corsResponse.getHeaders().getAccessControlAllowOrigin())
        .isEqualTo("http://localhost:5173");
  }

  @Test
  void servesSeededPortfolioContent() {
    List<String> collectionEndpoints = List.of(
        "/api/v1/projects",
        "/api/v1/skills",
        "/api/v1/education",
        "/api/v1/certifications",
        "/api/v1/experiences",
        "/api/v1/social-links");

    for (String endpoint : collectionEndpoints) {
      ResponseEntity<JsonNode> response = restTemplate.getForEntity(endpoint, JsonNode.class);
      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().path("data").isArray()).isTrue();
      assertThat(response.getBody().path("data").isEmpty()).isFalse();
    }

    ResponseEntity<JsonNode> profile = restTemplate.getForEntity("/api/v1/resume-profile", JsonNode.class);
    assertThat(profile.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(profile.getBody()).isNotNull();
    assertThat(profile.getBody().path("data").path("fullName").asText())
        .isEqualTo("Kavya Chaurasiya");
  }

  @Test
  void supportsProjectAdminCrudAndNotFoundErrors() {
    Map<String, Object> createRequest = Map.of(
        "title", "Integration Test Project",
        "slug", "integration-test-project",
        "description", "Created by the PostgreSQL-backed integration test.",
        "status", "COMPLETED",
        "featured", false,
        "displayOrder", 99,
        "technologies", List.of("Java", "Spring Boot"));

    ResponseEntity<JsonNode> created = restTemplate.postForEntity(
        "/api/v1/admin/projects", createRequest, JsonNode.class);
    assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(created.getBody()).isNotNull();
    long id = created.getBody().path("data").path("id").asLong();

    Map<String, Object> updateRequest = Map.of(
        "title", "Updated Integration Project",
        "slug", "integration-test-project",
        "description", "Updated through the admin API.",
        "status", "COMPLETED",
        "featured", true,
        "displayOrder", 98,
        "technologies", List.of("Java", "PostgreSQL"));
    ResponseEntity<JsonNode> updated = restTemplate.exchange(
        "/api/v1/admin/projects/" + id,
        HttpMethod.PUT,
        new HttpEntity<>(updateRequest),
        JsonNode.class);
    assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(updated.getBody()).isNotNull();
    assertThat(updated.getBody().path("data").path("featured").asBoolean()).isTrue();
    assertThat(updated.getBody().path("data").path("technologies").size()).isEqualTo(2);

    ResponseEntity<Void> deleted = restTemplate.exchange(
        "/api/v1/admin/projects/" + id, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
    assertThat(deleted.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

    ResponseEntity<JsonNode> missing = restTemplate.getForEntity(
        "/api/v1/projects/" + id, JsonNode.class);
    assertThat(missing.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    assertThat(missing.getBody()).isNotNull();
    assertThat(missing.getBody().path("error").asText()).isEqualTo("Not Found");
  }

  @Test
  void acceptsAndManagesContactMessages() {
    Map<String, Object> request = Map.of(
        "name", "Portfolio Visitor",
        "email", "visitor@example.com",
        "subject", "Project conversation",
        "message", "I would like to discuss a full-stack project opportunity.");
    ResponseEntity<JsonNode> created = restTemplate.postForEntity(
        "/api/v1/contact-messages", request, JsonNode.class);
    assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(created.getBody()).isNotNull();
    long id = created.getBody().path("data").path("id").asLong();
    assertThat(created.getBody().path("data").path("read").asBoolean()).isFalse();

    ResponseEntity<JsonNode> updated = restTemplate.exchange(
        "/api/v1/admin/contact-messages/" + id,
        HttpMethod.PUT,
        new HttpEntity<>(Map.of("read", true)),
        JsonNode.class);
    assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(updated.getBody()).isNotNull();
    assertThat(updated.getBody().path("data").path("read").asBoolean()).isTrue();

    ResponseEntity<JsonNode> messages = restTemplate.getForEntity(
        "/api/v1/admin/contact-messages", JsonNode.class);
    assertThat(messages.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(messages.getBody()).isNotNull();
    assertThat(messages.getBody().path("data").size()).isGreaterThanOrEqualTo(1);

    ResponseEntity<Void> deleted = restTemplate.exchange(
        "/api/v1/admin/contact-messages/" + id,
        HttpMethod.DELETE,
        HttpEntity.EMPTY,
        Void.class);
    assertThat(deleted.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
  }

  @Test
  void rejectsInvalidContent() {
    Map<String, Object> invalidSkill = Map.of(
        "category", "Backend",
        "name", "",
        "proficiencyLevel", 101,
        "displayOrder", 0);
    ResponseEntity<JsonNode> response = restTemplate.postForEntity(
        "/api/v1/admin/skills", invalidSkill, JsonNode.class);
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().path("validationErrors").has("name")).isTrue();
    assertThat(response.getBody().path("validationErrors").has("proficiencyLevel")).isTrue();
  }

  private static EmbeddedPostgres startPostgres() {
    try {
      return EmbeddedPostgres.builder().setPort(0).start();
    } catch (IOException exception) {
      throw new ExceptionInInitializerError(exception);
    }
  }

  private static String jdbcUrl() {
    try (Connection connection = POSTGRES.getPostgresDatabase().getConnection()) {
      return connection.getMetaData().getURL();
    } catch (SQLException exception) {
      throw new IllegalStateException("Unable to read embedded PostgreSQL URL.", exception);
    }
  }
}
