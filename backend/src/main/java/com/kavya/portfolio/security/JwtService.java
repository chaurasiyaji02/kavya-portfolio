package com.kavya.portfolio.security;

import com.kavya.portfolio.config.SecurityProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class JwtService {

  private final SecretKey signingKey;
  private final SecurityProperties properties;

  public JwtService(SecurityProperties properties) {
    if (!StringUtils.hasText(properties.jwtSecret())
        || properties.jwtSecret().getBytes(StandardCharsets.UTF_8).length < 32) {
      throw new IllegalStateException("JWT_SECRET must contain at least 32 bytes.");
    }
    if (properties.jwtExpiration() == null || properties.jwtExpiration().isNegative()
        || properties.jwtExpiration().isZero()) {
      throw new IllegalStateException("JWT_EXPIRATION must be a positive duration.");
    }
    this.properties = properties;
    this.signingKey = Keys.hmacShaKeyFor(properties.jwtSecret().getBytes(StandardCharsets.UTF_8));
  }

  public TokenDetails issueToken(UserDetails user) {
    Instant issuedAt = Instant.now();
    Instant expiresAt = issuedAt.plus(properties.jwtExpiration());
    String role = user.getAuthorities().iterator().next().getAuthority();
    String token = Jwts.builder()
        .subject(user.getUsername())
        .claim("role", role)
        .issuedAt(Date.from(issuedAt))
        .expiration(Date.from(expiresAt))
        .signWith(signingKey)
        .compact();
    return new TokenDetails(token, expiresAt);
  }

  public String extractSubject(String token) {
    return parseClaims(token).getSubject();
  }

  public boolean isValid(String token, UserDetails user) {
    Claims claims = parseClaims(token);
    return user.getUsername().equalsIgnoreCase(claims.getSubject())
        && claims.getExpiration().after(new Date());
  }

  private Claims parseClaims(String token) {
    return Jwts.parser()
        .verifyWith(signingKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  public record TokenDetails(String token, Instant expiresAt) {
  }
}
