package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PastCommitteeMemberRepository extends JpaRepository<PastCommitteeMember, Long> {
    java.util.List<PastCommitteeMember> findByPastCommitteeYearId(Long yearId);

    @Modifying
    @Query("DELETE FROM PastCommitteeMember m WHERE m.pastCommitteeYear.id = :yearId")
    void deleteByPastCommitteeYearId(@Param("yearId") Long yearId);
}
