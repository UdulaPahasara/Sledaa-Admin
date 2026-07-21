package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.CommitteeCoverImage;
import com.Sleeda.Sleeda.repository.CommitteeCoverImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CommitteeCoverImageServiceImpl implements CommitteeCoverImageService {

    @Autowired
    private CommitteeCoverImageRepository repository;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public List<CommitteeCoverImage> getAllCoverImages() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public CommitteeCoverImage saveCoverImage(MultipartFile imageFile, Boolean isMain) {
        CommitteeCoverImage coverImage = new CommitteeCoverImage();
        coverImage.setIsMain(isMain != null ? isMain : false);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String imageUrl = fileStorageService.storeFile(imageFile, "committee_covers");
                coverImage.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to store cover image file", e);
            }
        } else {
            throw new IllegalArgumentException("Image file is required.");
        }

        return repository.save(coverImage);
    }

    @Override
    public List<CommitteeCoverImage> saveCoverImages(MultipartFile mainImage, MultipartFile[] secondaryImages) {
        java.util.List<CommitteeCoverImage> savedImages = new java.util.ArrayList<>();
        
        if (mainImage != null && !mainImage.isEmpty()) {
            savedImages.add(saveCoverImage(mainImage, true));
        }
        
        if (secondaryImages != null) {
            for (MultipartFile secondaryImage : secondaryImages) {
                if (secondaryImage != null && !secondaryImage.isEmpty()) {
                    savedImages.add(saveCoverImage(secondaryImage, false));
                }
            }
        }
        
        return savedImages;
    }

    @Override
    public CommitteeCoverImage updateCoverImage(Long id, MultipartFile imageFile, Boolean isMain) {
        CommitteeCoverImage coverImage = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cover image not found with id: " + id));
        
        if (isMain != null) {
            coverImage.setIsMain(isMain);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String imageUrl = fileStorageService.storeFile(imageFile, "committee_covers");
                coverImage.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to store cover image file", e);
            }
        }

        return repository.save(coverImage);
    }

    @Override
    public void deleteCoverImage(Long id) {
        repository.findById(id).ifPresent(coverImage -> {
            repository.delete(coverImage);
        });
    }
}
