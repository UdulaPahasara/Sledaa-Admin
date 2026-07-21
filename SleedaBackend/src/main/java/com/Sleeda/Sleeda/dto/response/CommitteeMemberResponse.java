package com.Sleeda.Sleeda.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommitteeMemberResponse {
    private Long id;
    private String name;
    private String position;
    private String imageUrl;
    private Integer displayOrder;
    private LocalDateTime createdAt;
}
