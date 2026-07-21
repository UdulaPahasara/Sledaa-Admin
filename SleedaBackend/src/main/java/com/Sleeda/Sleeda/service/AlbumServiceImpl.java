package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.AlbumResponse;
import com.Sleeda.Sleeda.entity.Album;
import com.Sleeda.Sleeda.entity.AlbumImage;
import com.Sleeda.Sleeda.repository.AlbumImageRepository;
import com.Sleeda.Sleeda.repository.AlbumRepository;
import com.Sleeda.Sleeda.dto.response.AlbumImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final AlbumImageRepository albumImageRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public AlbumResponse createAlbum(String title, MultipartFile coverImage, List<MultipartFile> images) throws Exception {
        // 1. Save cover image
        String coverImageUrl = fileStorageService.storeFile(coverImage, "albums/covers");

        // 2. Create Album entity
        Album album = new Album();
        album.setTitle(title);
        album.setCoverImageUrl(coverImageUrl);
        
        // 3. Save album images if provided
        if (images != null && !images.isEmpty()) {
            List<AlbumImage> albumImages = new ArrayList<>();
            for (MultipartFile imageFile : images) {
                if (imageFile != null && !imageFile.isEmpty()) {
                    String imageUrl = fileStorageService.storeFile(imageFile, "albums/images");
                    AlbumImage albumImage = new AlbumImage();
                    albumImage.setImageUrl(imageUrl);
                    albumImage.setAlbum(album);
                    albumImages.add(albumImage);
                }
            }
            album.setImages(albumImages);
        }

        // 4. Save to DB
        Album savedAlbum = albumRepository.save(album);

        // 5. Map to response DTO
        List<AlbumImageResponse> imagesResp = savedAlbum.getImages().stream()
                .map(img -> new AlbumImageResponse(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());

        return new AlbumResponse(
                savedAlbum.getId(),
                savedAlbum.getTitle(),
                savedAlbum.getCoverImageUrl(),
                savedAlbum.getCreatedAt(),
                imagesResp
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlbumResponse> getAllAlbums() {
        return albumRepository.findAll().stream().map(album -> {
            List<AlbumImageResponse> imagesResp = album.getImages().stream()
                    .map(img -> new AlbumImageResponse(img.getId(), img.getImageUrl()))
                    .collect(Collectors.toList());
            return new AlbumResponse(
                    album.getId(),
                    album.getTitle(),
                    album.getCoverImageUrl(),
                    album.getCreatedAt(),
                    imagesResp
            );
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AlbumResponse getAlbumById(Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + id));
        List<AlbumImageResponse> imagesResp = album.getImages().stream()
                .map(img -> new AlbumImageResponse(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());
        return new AlbumResponse(
                album.getId(),
                album.getTitle(),
                album.getCoverImageUrl(),
                album.getCreatedAt(),
                imagesResp
        );
    }

    @Override
    @Transactional
    public AlbumResponse addImagesToAlbum(Long albumId, List<MultipartFile> images) throws Exception {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + albumId));

        if (images != null && !images.isEmpty()) {
            for (MultipartFile imageFile : images) {
                if (imageFile != null && !imageFile.isEmpty()) {
                    String imageUrl = fileStorageService.storeFile(imageFile, "albums/images");
                    AlbumImage albumImage = new AlbumImage();
                    albumImage.setImageUrl(imageUrl);
                    albumImage.setAlbum(album);
                    album.getImages().add(albumImage);
                }
            }
        }
        Album savedAlbum = albumRepository.save(album);
        return getAlbumById(savedAlbum.getId());
    }

    @Override
    @Transactional
    public void deleteImage(Long imageId) {
        albumImageRepository.deleteById(imageId);
    }

    @Override
    @Transactional
    public void deleteAlbum(Long albumId) {
        albumRepository.deleteById(albumId);
    }

    @Override
    @Transactional
    public AlbumResponse updateAlbum(Long albumId, String title, MultipartFile coverImage) throws Exception {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + albumId));

        if (title != null && !title.isEmpty()) {
            album.setTitle(title);
        }

        if (coverImage != null && !coverImage.isEmpty()) {
            String coverImageUrl = fileStorageService.storeFile(coverImage, "albums/covers");
            album.setCoverImageUrl(coverImageUrl);
        }

        albumRepository.save(album);
        return getAlbumById(albumId);
    }
}
