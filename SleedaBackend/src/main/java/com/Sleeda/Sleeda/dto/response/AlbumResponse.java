package com.Sleeda.Sleeda.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumResponse {
    private Long id;
    private String title;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private List<AlbumImageResponse> images;
}
