package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeYearCoverImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PastCommitteeYearCoverImageRepository extends JpaRepository<PastCommitteeYearCoverImage, Long> {
    List<PastCommitteeYearCoverImage> findByPastCommitteeYearIdOrderByCreatedAtAsc(Long pastCommitteeYearId);
}
