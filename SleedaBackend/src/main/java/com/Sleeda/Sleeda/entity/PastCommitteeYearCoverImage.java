package com.Sleeda.Sleeda.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "past_committee_year_cover_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PastCommitteeYearCoverImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "past_committee_year_id", nullable = false)
    @JsonIgnore
    private PastCommitteeYear pastCommitteeYear;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Boolean isMain = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
