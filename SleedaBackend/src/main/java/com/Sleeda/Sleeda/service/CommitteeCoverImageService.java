package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.CommitteeCoverImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CommitteeCoverImageService {
    List<CommitteeCoverImage> getAllCoverImages();
    CommitteeCoverImage saveCoverImage(MultipartFile imageFile, Boolean isMain);
    List<CommitteeCoverImage> saveCoverImages(MultipartFile mainImage, MultipartFile[] secondaryImages);
    CommitteeCoverImage updateCoverImage(Long id, MultipartFile imageFile, Boolean isMain);
    void deleteCoverImage(Long id);
}
