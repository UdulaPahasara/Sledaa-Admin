package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.CommitteeCoverImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommitteeCoverImageRepository extends JpaRepository<CommitteeCoverImage, Long> {
    List<CommitteeCoverImage> findAllByOrderByCreatedAtDesc();
}
