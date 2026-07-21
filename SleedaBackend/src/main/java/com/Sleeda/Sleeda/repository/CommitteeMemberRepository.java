package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.CommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitteeMemberRepository extends JpaRepository<CommitteeMember, Long> {
}
