package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.AuthDto.LoginRequest;
import com.kavya.portfolio.dto.AuthDto.LoginResponse;
import com.kavya.portfolio.exception.UnauthorizedException;
import com.kavya.portfolio.security.JwtService;
import com.kavya.portfolio.security.JwtService.TokenDetails;
import java.util.Locale;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  public AuthService(AuthenticationManager authenticationManager, JwtService jwtService) {
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public LoginResponse login(LoginRequest request) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.email().trim().toLowerCase(Locale.ROOT),
              request.password()));
      UserDetails user = (UserDetails) authentication.getPrincipal();
      TokenDetails token = jwtService.issueToken(user);
      String role = user.getAuthorities().iterator().next().getAuthority().replaceFirst("^ROLE_", "");
      return new LoginResponse(
          token.token(),
          "Bearer",
          token.expiresAt(),
          user.getUsername(),
          role);
    } catch (BadCredentialsException exception) {
      throw new UnauthorizedException("Invalid admin email or password.");
    }
  }
}
