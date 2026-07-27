package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastCommitteeMemberRepository extends JpaRepository<PastCommitteeMember, Long> {
    java.util.List<PastCommitteeMember> findByPastCommitteeYearId(Long yearId);
}
