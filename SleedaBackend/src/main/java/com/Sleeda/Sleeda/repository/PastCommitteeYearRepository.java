package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PastCommitteeYearRepository extends JpaRepository<PastCommitteeYear, Long> {
    List<PastCommitteeYear> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    Optional<PastCommitteeYear> findByYearLabel(String yearLabel);
}
