package com.Sleeda.Sleeda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

@Entity
@Table(name = "past_committee_year_covers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PastCommitteeYearCoverImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "past_committee_year_id", nullable = false)
    private PastCommitteeYear pastCommitteeYear;

    @Column(nullable = false, name = "image_url")
    private String imageUrl;

    @Column(name = "is_main")
    private Boolean isMain = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
