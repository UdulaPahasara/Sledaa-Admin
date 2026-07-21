package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.AlbumResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface AlbumService {
    AlbumResponse createAlbum(String title, MultipartFile coverImage, List<MultipartFile> images) throws Exception;
    List<AlbumResponse> getAllAlbums();
    AlbumResponse getAlbumById(Long id);
    AlbumResponse addImagesToAlbum(Long albumId, List<MultipartFile> images) throws Exception;
    void deleteImage(Long imageId);
    void deleteAlbum(Long albumId);
    AlbumResponse updateAlbum(Long albumId, String title, MultipartFile coverImage) throws Exception;
}
