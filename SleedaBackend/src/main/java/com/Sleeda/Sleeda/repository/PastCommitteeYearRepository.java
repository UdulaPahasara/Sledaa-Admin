package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PastCommitteeYearRepository extends JpaRepository<PastCommitteeYear, Long> {
    List<PastCommitteeYear> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    Optional<PastCommitteeYear> findByYearLabel(String yearLabel);

    @Modifying
    @Query(value = "DELETE FROM past_committee_years WHERE id = :id", nativeQuery = true)
    void deleteByIdNative(@Param("id") Long id);
}
