package com.kavya.portfolio.repository;

import com.kavya.portfolio.entity.SystemMessage;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemMessageRepository extends JpaRepository<SystemMessage, Long> {

  Optional<SystemMessage> findByCode(String code);
}
