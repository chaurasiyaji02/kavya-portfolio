package com.kavya.portfolio.repository;
import com.kavya.portfolio.entity.SocialLink;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
  List<SocialLink> findByActiveTrueOrderByDisplayOrderAscIdAsc();
  Optional<SocialLink> findByIdAndActiveTrue(Long id);
}
