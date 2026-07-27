package com.Sleeda.Sleeda.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "past_committee_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PastCommitteeMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String position;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "display_order")
    private Integer displayOrder = 0; // For sorting members if needed

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "past_committee_year_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private PastCommitteeYear pastCommitteeYear;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
