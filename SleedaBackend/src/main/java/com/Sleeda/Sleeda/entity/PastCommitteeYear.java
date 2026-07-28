package com.Sleeda.Sleeda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "past_committee_years")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PastCommitteeYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String yearLabel; // e.g. "2025"

    @Column(nullable = false)
    private String yearName; // e.g. "2025 Committee"


    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "pastCommitteeYear")
    private List<PastCommitteeYearCoverImage> coverImages = new ArrayList<>();

    @OneToMany(mappedBy = "pastCommitteeYear")
    private List<PastCommitteeMember> members = new ArrayList<>();
}
