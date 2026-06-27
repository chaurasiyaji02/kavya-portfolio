package com.kavya.portfolio.repository;
import com.kavya.portfolio.entity.ResumeProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ResumeProfileRepository extends JpaRepository<ResumeProfile, Long> {
  Optional<ResumeProfile> findFirstByActiveTrueOrderByIdAsc();
}
