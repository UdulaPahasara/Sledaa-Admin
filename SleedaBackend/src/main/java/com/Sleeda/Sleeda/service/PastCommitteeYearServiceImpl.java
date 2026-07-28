package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.PastCommitteeYear;
import com.Sleeda.Sleeda.entity.PastCommitteeYearCoverImage;
import com.Sleeda.Sleeda.repository.PastCommitteeYearCoverImageRepository;
import com.Sleeda.Sleeda.repository.PastCommitteeMemberRepository;
import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import com.Sleeda.Sleeda.repository.PastCommitteeYearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.PersistenceContext;

@Service
public class PastCommitteeYearServiceImpl implements PastCommitteeYearService {

    @Autowired
    private PastCommitteeYearRepository yearRepository;

    @Autowired
    private PastCommitteeYearCoverImageRepository coverImageRepository;

    @Autowired
    private PastCommitteeMemberRepository memberRepository;

    @Autowired
    private FileStorageService fileStorageService;

    // ── Year CRUD ────────────────────────────────────────────────────────────

    @Override
    public List<PastCommitteeYear> getAllYears() {
        return yearRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    @Override
    public PastCommitteeYear createYear(String yearLabel, String yearName) {
        // Upsert: if a year with this label already exists, update it instead of inserting a duplicate
        Optional<PastCommitteeYear> existing = yearRepository.findByYearLabel(yearLabel);
        PastCommitteeYear year = existing.orElseGet(PastCommitteeYear::new);

        year.setYearLabel(yearLabel);
        year.setYearName(yearName != null ? yearName : yearLabel + " Committee");

        return yearRepository.save(year);
    }

    @Override
    public PastCommitteeYear updateYear(Long id, String yearLabel, String yearName) {
        PastCommitteeYear year = yearRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Past committee year not found with id: " + id));

        if (yearLabel != null && !yearLabel.isBlank()) {
            if (!year.getYearLabel().equals(yearLabel)) {
                Optional<PastCommitteeYear> existing = yearRepository.findByYearLabel(yearLabel);
                if (existing.isPresent()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A committee year with label '" + yearLabel + "' already exists.");
                }
            }
            year.setYearLabel(yearLabel);
        }
        if (yearName != null && !yearName.isBlank()) {
            year.setYearName(yearName);
        }

        return yearRepository.save(year);
    }

    @PersistenceContext
    private jakarta.persistence.EntityManager entityManager;

    @Override
    @Transactional
    public void deleteYear(Long id) {
        if (!yearRepository.existsById(id)) return;
        
        // Delete physical files
        memberRepository.findByPastCommitteeYearId(id).forEach(member -> {
            fileStorageService.deleteFile(member.getImageUrl());
        });
        coverImageRepository.findByPastCommitteeYearIdOrderByCreatedAtAsc(id).forEach(image -> {
            fileStorageService.deleteFile(image.getImageUrl());
        });
        // Use native SQL to delete all children and parent in correct order
        // entityManager.flush() after each child delete forces MySQL to commit the rows
        // BEFORE the FK-constrained parent row is attempted
        entityManager.createNativeQuery("DELETE FROM past_committee_members WHERE past_committee_year_id = :id")
                .setParameter("id", id)
                .executeUpdate();
        entityManager.createNativeQuery("DELETE FROM past_committee_year_cover_images WHERE past_committee_year_id = :id")
                .setParameter("id", id)
                .executeUpdate();
        entityManager.createNativeQuery("DELETE FROM past_committee_years WHERE id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    // ── Cover Images for a Year ──────────────────────────────────────────────

    @Override
    public List<PastCommitteeYearCoverImage> getCoverImagesByYearLabel(String yearLabel) {
        return yearRepository.findByYearLabel(yearLabel)
                .map(year -> coverImageRepository.findByPastCommitteeYearIdOrderByCreatedAtAsc(year.getId()))
                .orElse(new ArrayList<>());
    }

    @Override
    public List<PastCommitteeYearCoverImage> addCoverImages(Long yearId, MultipartFile mainImage, MultipartFile[] secondaryImages) {
        PastCommitteeYear year = yearRepository.findById(yearId)
                .orElseThrow(() -> new RuntimeException("Past committee year not found with id: " + yearId));

        List<PastCommitteeYearCoverImage> saved = new ArrayList<>();

        if (mainImage != null && !mainImage.isEmpty()) {
            saved.add(saveSingleCoverImage(year, mainImage, true));
        }

        if (secondaryImages != null) {
            for (MultipartFile img : secondaryImages) {
                if (img != null && !img.isEmpty()) {
                    saved.add(saveSingleCoverImage(year, img, false));
                }
            }
        }

        return saved;
    }

    private PastCommitteeYearCoverImage saveSingleCoverImage(PastCommitteeYear year, MultipartFile file, boolean isMain) {
        try {
            String url = fileStorageService.storeFile(file, "past_committee_year_covers");
            PastCommitteeYearCoverImage image = new PastCommitteeYearCoverImage();
            image.setPastCommitteeYear(year);
            image.setImageUrl(url);
            image.setIsMain(isMain);
            return coverImageRepository.save(image);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store past year cover image", e);
        }
    }

    @Override
    public PastCommitteeYearCoverImage updateCoverImage(Long coverImageId, MultipartFile imageFile, Boolean isMain) {
        PastCommitteeYearCoverImage image = coverImageRepository.findById(coverImageId)
                .orElseThrow(() -> new RuntimeException("Cover image not found with id: " + coverImageId));

        if (isMain != null) {
            image.setIsMain(isMain);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String url = fileStorageService.storeFile(imageFile, "past_committee_year_covers");
                image.setImageUrl(url);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update cover image file", e);
            }
        }

        return coverImageRepository.save(image);
    }

    @Override
    public void deleteCoverImage(Long coverImageId) {
        coverImageRepository.findById(coverImageId).ifPresent(image -> {
            fileStorageService.deleteFile(image.getImageUrl());
            coverImageRepository.delete(image);
        });
    }
}
