package com.kavya.portfolio;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpHeaders;
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

    HttpHeaders headers = new HttpHeaders();
    headers.setOrigin("http://localhost:5173");
    headers.setAccessControlRequestMethod(HttpMethod.GET);
    RequestEntity<Void> preflight = new RequestEntity<>(headers, HttpMethod.OPTIONS, java.net.URI.create("/api/v1/sample"));

    ResponseEntity<Void> corsResponse = restTemplate.exchange(preflight, Void.class);
    assertThat(corsResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(corsResponse.getHeaders().getAccessControlAllowOrigin())
        .isEqualTo("http://localhost:5173");
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
