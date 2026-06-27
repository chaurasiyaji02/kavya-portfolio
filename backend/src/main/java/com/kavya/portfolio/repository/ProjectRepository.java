package com.kavya.portfolio.repository;
import com.kavya.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProjectRepository extends JpaRepository<Project, Long> {}
