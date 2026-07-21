package com.Sleeda.Sleeda.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumImageResponse {
    private Long id;
    private String imageUrl;
}
