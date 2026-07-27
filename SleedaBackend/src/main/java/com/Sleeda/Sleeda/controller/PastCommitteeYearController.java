package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.entity.PastCommitteeYear;
import com.Sleeda.Sleeda.entity.PastCommitteeYearCoverImage;
import com.Sleeda.Sleeda.service.PastCommitteeYearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PastCommitteeYearController {

    @Autowired
    private PastCommitteeYearService service;

    // ── Past Committee Years ─────────────────────────────────────────────────

    /**
     * GET /api/past-committee-years
     * Returns all past committee years (used for the year cards grid on the public site)
     */
    @GetMapping("/past-committee-years")
    public ResponseEntity<List<PastCommitteeYear>> getAllYears() {
        return ResponseEntity.ok(service.getAllYears());
    }

    /**
     * POST /api/past-committee-years
     * Creates a new past committee year record (Admin: Add Past Committee)
     */
    @PostMapping("/past-committee-years")
    public ResponseEntity<PastCommitteeYear> createYear(
            @RequestParam("yearLabel") String yearLabel,
            @RequestParam(value = "yearName", required = false) String yearName,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage) {

        PastCommitteeYear created = service.createYear(yearLabel, yearName, coverImage);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * PUT /api/past-committee-years/{id}
     * Updates an existing past committee year (Admin: Edit)
     */
    @PutMapping("/past-committee-years/{id}")
    public ResponseEntity<PastCommitteeYear> updateYear(
            @PathVariable Long id,
            @RequestParam(value = "yearLabel", required = false) String yearLabel,
            @RequestParam(value = "yearName", required = false) String yearName,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage) {

        PastCommitteeYear updated = service.updateYear(id, yearLabel, yearName, coverImage);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/past-committee-years/{id}
     * Deletes a past committee year and all its cover images (Admin: Delete)
     */
    @DeleteMapping("/past-committee-years/{id}")
    public ResponseEntity<Void> deleteYear(@PathVariable Long id) {
        service.deleteYear(id);
        return ResponseEntity.noContent().build();
    }

    // ── Past Committee Year Cover Images ─────────────────────────────────────

    /**
     * GET /api/past-committee-covers?year=2025
     * Returns cover images for a given year (used for the detail carousel on the public site)
     */
    @GetMapping("/past-committee-covers")
    public ResponseEntity<List<PastCommitteeYearCoverImage>> getCoverImagesByYear(
            @RequestParam("year") String year) {
        return ResponseEntity.ok(service.getCoverImagesByYearLabel(year));
    }

    /**
     * POST /api/past-committee-years/{yearId}/covers
     * Adds cover images to a past committee year (Admin: Add New Image in detail view)
     */
    @PostMapping("/past-committee-years/{yearId}/covers")
    public ResponseEntity<List<PastCommitteeYearCoverImage>> addCoverImages(
            @PathVariable Long yearId,
            @RequestParam(value = "mainImage", required = false) MultipartFile mainImage,
            @RequestParam(value = "secondaryImages", required = false) MultipartFile[] secondaryImages) {

        List<PastCommitteeYearCoverImage> created = service.addCoverImages(yearId, mainImage, secondaryImages);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * PUT /api/past-committee-covers/{coverImageId}
     * Updates a specific cover image (Admin: Edit cover image)
     */
    @PutMapping("/past-committee-covers/{coverImageId}")
    public ResponseEntity<PastCommitteeYearCoverImage> updateCoverImage(
            @PathVariable Long coverImageId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "isMain", required = false) Boolean isMain) {

        PastCommitteeYearCoverImage updated = service.updateCoverImage(coverImageId, imageFile, isMain);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/past-committee-covers/{coverImageId}
     * Deletes a specific cover image (Admin: Delete)
     */
    @DeleteMapping("/past-committee-covers/{coverImageId}")
    public ResponseEntity<Void> deleteCoverImage(@PathVariable Long coverImageId) {
        service.deleteCoverImage(coverImageId);
        return ResponseEntity.noContent().build();
    }
}
