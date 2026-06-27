package com.kavya.portfolio.security;

import com.kavya.portfolio.entity.AdminUser;
import com.kavya.portfolio.repository.AdminUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminUserDetailsService implements UserDetailsService {

  private final AdminUserRepository repository;

  public AdminUserDetailsService(AdminUserRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    AdminUser admin = repository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new UsernameNotFoundException("Invalid admin credentials."));

    return User.withUsername(admin.getEmail())
        .password(admin.getPasswordHash())
        .roles(admin.getRole().name())
        .build();
  }
}
