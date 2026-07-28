package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.PastCommitteeYear;
import com.Sleeda.Sleeda.entity.PastCommitteeYearCoverImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PastCommitteeYearService {

    // Year CRUD
    List<PastCommitteeYear> getAllYears();
    PastCommitteeYear createYear(String yearLabel, String yearName);
    PastCommitteeYear updateYear(Long id, String yearLabel, String yearName);
    void deleteYear(Long id);

    // Cover images for a specific year
    List<PastCommitteeYearCoverImage> getCoverImagesByYearLabel(String yearLabel);
    List<PastCommitteeYearCoverImage> addCoverImages(Long yearId, MultipartFile mainImage, MultipartFile[] secondaryImages);
    PastCommitteeYearCoverImage updateCoverImage(Long coverImageId, MultipartFile imageFile, Boolean isMain);
    void deleteCoverImage(Long coverImageId);
}
