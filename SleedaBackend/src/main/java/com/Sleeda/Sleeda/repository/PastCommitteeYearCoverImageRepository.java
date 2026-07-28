package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeYearCoverImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PastCommitteeYearCoverImageRepository extends JpaRepository<PastCommitteeYearCoverImage, Long> {
    List<PastCommitteeYearCoverImage> findByPastCommitteeYearIdOrderByCreatedAtAsc(Long pastCommitteeYearId);

    @Modifying
    @Query("DELETE FROM PastCommitteeYearCoverImage c WHERE c.pastCommitteeYear.id = :yearId")
    void deleteByPastCommitteeYearId(@Param("yearId") Long yearId);
}
