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
  private static final String ADMIN_EMAIL = "admin.integration@example.com";
  private static final String ADMIN_PASSWORD = "IntegrationPassword!42";

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @DynamicPropertySource
  static void databaseProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", PortfolioApplicationIntegrationTest::jdbcUrl);
    registry.add("spring.datasource.username", () -> "postgres");
    registry.add("spring.datasource.password", () -> "postgres");
    registry.add("app.security.jwt-secret",
        () -> "integration-test-jwt-secret-with-more-than-thirty-two-bytes");
    registry.add("app.security.jwt-expiration", () -> "PT15M");
    registry.add("app.security.admin-email", () -> ADMIN_EMAIL);
    registry.add("app.security.admin-password", () -> ADMIN_PASSWORD);
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
  void authenticatesAdminAndProtectsAdminApis() {
    ResponseEntity<JsonNode> anonymous = restTemplate.getForEntity(
        "/api/v1/admin/contact-messages", JsonNode.class);
    assertThat(anonymous.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    assertThat(anonymous.getBody()).isNotNull();
    assertThat(anonymous.getBody().path("message").asText()).contains("Authentication");

    ResponseEntity<JsonNode> invalidLogin = restTemplate.postForEntity(
        "/api/v1/auth/login",
        Map.of("email", ADMIN_EMAIL, "password", "incorrect-password"),
        JsonNode.class);
    assertThat(invalidLogin.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);

    ResponseEntity<JsonNode> login = login();
    assertThat(login.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(login.getBody()).isNotNull();
    assertThat(login.getBody().path("data").path("token").asText()).isNotBlank();
    assertThat(login.getBody().path("data").path("tokenType").asText()).isEqualTo("Bearer");
    assertThat(login.getBody().path("data").path("role").asText()).isEqualTo("ADMIN");

    ResponseEntity<JsonNode> authorized = restTemplate.exchange(
        "/api/v1/admin/contact-messages",
        HttpMethod.GET,
        new HttpEntity<>(authorizationHeaders()),
        JsonNode.class);
    assertThat(authorized.getStatusCode()).isEqualTo(HttpStatus.OK);

    String passwordHash = jdbcTemplate.queryForObject(
        "select password_hash from admin_users where email = ?",
        String.class,
        ADMIN_EMAIL);
    assertThat(passwordHash).startsWith("$2");
    assertThat(passwordHash).doesNotContain(ADMIN_PASSWORD);
  }

  @Test
  void supportsProjectAdminCrudAndNotFoundErrors() {
    Map<String, Object> createRequest = Map.of(
        "title", "Integration Test Project",
        "slug", "integration-test-project",
        "description", "Created by the PostgreSQL-backed integration test.",
        "imageUrl", "https://example.com/project-preview.png",
        "status", "COMPLETED",
        "featured", false,
        "displayOrder", 99,
        "technologies", List.of("Java", "Spring Boot"));

    ResponseEntity<JsonNode> created = restTemplate.exchange(
        "/api/v1/admin/projects",
        HttpMethod.POST,
        new HttpEntity<>(createRequest, authorizationHeaders()),
        JsonNode.class);
    assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(created.getBody()).isNotNull();
    long id = created.getBody().path("data").path("id").asLong();

    Map<String, Object> updateRequest = Map.of(
        "title", "Updated Integration Project",
        "slug", "integration-test-project",
        "description", "Updated through the admin API.",
        "imageUrl", "https://example.com/project-preview-updated.png",
        "status", "COMPLETED",
        "featured", true,
        "displayOrder", 98,
        "technologies", List.of("Java", "PostgreSQL"));
    ResponseEntity<JsonNode> updated = restTemplate.exchange(
        "/api/v1/admin/projects/" + id,
        HttpMethod.PUT,
        new HttpEntity<>(updateRequest, authorizationHeaders()),
        JsonNode.class);
    assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(updated.getBody()).isNotNull();
    assertThat(updated.getBody().path("data").path("featured").asBoolean()).isTrue();
    assertThat(updated.getBody().path("data").path("imageUrl").asText())
        .isEqualTo("https://example.com/project-preview-updated.png");
    assertThat(updated.getBody().path("data").path("technologies").size()).isEqualTo(2);

    ResponseEntity<Void> deleted = restTemplate.exchange(
        "/api/v1/admin/projects/" + id,
        HttpMethod.DELETE,
        new HttpEntity<>(authorizationHeaders()),
        Void.class);
    assertThat(deleted.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

    ResponseEntity<JsonNode> missing = restTemplate.getForEntity(
        "/api/v1/projects/" + id, JsonNode.class);
    assertThat(missing.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    assertThat(missing.getBody()).isNotNull();
    assertThat(missing.getBody().path("error").asText()).isEqualTo("Not Found");
  }

  @Test
  void supportsCrudForEveryAdminContentResource() {
    assertAdminCrud(
        "skills",
        Map.of("category", "Testing", "name", "Test Skill", "proficiencyLevel", 70, "displayOrder", 90),
        Map.of("category", "Testing", "name", "Updated Skill", "proficiencyLevel", 80, "displayOrder", 91),
        "name",
        "Updated Skill");
    assertAdminCrud(
        "education",
        Map.of(
            "institution", "Test University",
            "degree", "Bachelor of Testing",
            "fieldOfStudy", "Software Quality",
            "startDate", "2022-01-01",
            "endDate", "2025-01-01",
            "description", "Initial education",
            "displayOrder", 90),
        Map.of(
            "institution", "Updated University",
            "degree", "Bachelor of Testing",
            "fieldOfStudy", "Software Quality",
            "startDate", "2022-01-01",
            "endDate", "2025-01-01",
            "description", "Updated education",
            "displayOrder", 91),
        "institution",
        "Updated University");
    assertAdminCrud(
        "certifications",
        Map.of(
            "title", "Test Certification",
            "issuer", "Test Issuer",
            "issueDate", "2025-01-01",
            "credentialId", "TEST-1",
            "credentialUrl", "https://example.com/test-credential",
            "displayOrder", 90),
        Map.of(
            "title", "Updated Certification",
            "issuer", "Test Issuer",
            "issueDate", "2025-01-01",
            "credentialId", "TEST-2",
            "credentialUrl", "https://example.com/test-credential",
            "displayOrder", 91),
        "title",
        "Updated Certification");
    assertAdminCrud(
        "experiences",
        Map.of(
            "organization", "Test Studio",
            "role", "Test Intern",
            "location", "Remote",
            "startDate", "2025-01-01",
            "endDate", "2025-02-01",
            "currentRole", false,
            "description", "Initial experience",
            "displayOrder", 90,
            "highlights", List.of("Created tests")),
        Map.of(
            "organization", "Updated Studio",
            "role", "Test Intern",
            "location", "Remote",
            "startDate", "2025-01-01",
            "endDate", "2025-02-01",
            "currentRole", false,
            "description", "Updated experience",
            "displayOrder", 91,
            "highlights", List.of("Created tests", "Verified APIs")),
        "organization",
        "Updated Studio");
    assertAdminCrud(
        "social-links",
        Map.of(
            "platform", "Test",
            "displayLabel", "Test Profile",
            "url", "https://example.com/test-profile",
            "active", false,
            "displayOrder", 90),
        Map.of(
            "platform", "Test",
            "displayLabel", "Updated Profile",
            "url", "https://example.com/updated-profile",
            "active", false,
            "displayOrder", 91),
        "displayLabel",
        "Updated Profile");
    assertAdminCrud(
        "resume-profiles",
        Map.of(
            "fullName", "Test Admin",
            "headline", "Test Profile",
            "summary", "A profile created by integration tests.",
            "email", "profile-test@example.com",
            "phone", "+91 11111 11111",
            "location", "India",
            "resumeUrl", "https://example.com/resume",
            "photoUrl", "https://example.com/photo.png",
            "active", false),
        Map.of(
            "fullName", "Updated Admin",
            "headline", "Updated Profile",
            "summary", "A profile updated by integration tests.",
            "email", "profile-test@example.com",
            "phone", "+91 11111 11111",
            "location", "India",
            "resumeUrl", "https://example.com/resume",
            "photoUrl", "https://example.com/photo-updated.png",
            "active", false),
        "fullName",
        "Updated Admin");
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
        new HttpEntity<>(Map.of("read", true), authorizationHeaders()),
        JsonNode.class);
    assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(updated.getBody()).isNotNull();
    assertThat(updated.getBody().path("data").path("read").asBoolean()).isTrue();

    ResponseEntity<JsonNode> messages = restTemplate.exchange(
        "/api/v1/admin/contact-messages",
        HttpMethod.GET,
        new HttpEntity<>(authorizationHeaders()),
        JsonNode.class);
    assertThat(messages.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(messages.getBody()).isNotNull();
    assertThat(messages.getBody().path("data").size()).isGreaterThanOrEqualTo(1);

    ResponseEntity<Void> deleted = restTemplate.exchange(
        "/api/v1/admin/contact-messages/" + id,
        HttpMethod.DELETE,
        new HttpEntity<>(authorizationHeaders()),
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
    ResponseEntity<JsonNode> response = restTemplate.exchange(
        "/api/v1/admin/skills",
        HttpMethod.POST,
        new HttpEntity<>(invalidSkill, authorizationHeaders()),
        JsonNode.class);
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

  private ResponseEntity<JsonNode> login() {
    return restTemplate.postForEntity(
        "/api/v1/auth/login",
        Map.of("email", ADMIN_EMAIL, "password", ADMIN_PASSWORD),
        JsonNode.class);
  }

  private HttpHeaders authorizationHeaders() {
    ResponseEntity<JsonNode> login = login();
    assertThat(login.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(login.getBody()).isNotNull();
    String token = login.getBody().path("data").path("token").asText();
    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(token);
    return headers;
  }

  private void assertAdminCrud(
      String resource,
      Map<String, Object> createRequest,
      Map<String, Object> updateRequest,
      String updatedField,
      String expectedValue) {
    ResponseEntity<JsonNode> created = restTemplate.exchange(
        "/api/v1/admin/" + resource,
        HttpMethod.POST,
        new HttpEntity<>(createRequest, authorizationHeaders()),
        JsonNode.class);
    assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(created.getBody()).isNotNull();
    long id = created.getBody().path("data").path("id").asLong();

    ResponseEntity<JsonNode> updated = restTemplate.exchange(
        "/api/v1/admin/" + resource + "/" + id,
        HttpMethod.PUT,
        new HttpEntity<>(updateRequest, authorizationHeaders()),
        JsonNode.class);
    assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(updated.getBody()).isNotNull();
    assertThat(updated.getBody().path("data").path(updatedField).asText())
        .isEqualTo(expectedValue);

    ResponseEntity<Void> deleted = restTemplate.exchange(
        "/api/v1/admin/" + resource + "/" + id,
        HttpMethod.DELETE,
        new HttpEntity<>(authorizationHeaders()),
        Void.class);
    assertThat(deleted.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
  }
}
