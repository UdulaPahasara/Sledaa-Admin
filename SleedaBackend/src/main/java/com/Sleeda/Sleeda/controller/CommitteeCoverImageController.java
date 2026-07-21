package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.entity.CommitteeCoverImage;
import com.Sleeda.Sleeda.service.CommitteeCoverImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/committee-covers")
public class CommitteeCoverImageController {

    @Autowired
    private CommitteeCoverImageService coverImageService;

    @GetMapping
    public ResponseEntity<List<CommitteeCoverImage>> getAllCoverImages() {
        return ResponseEntity.ok(coverImageService.getAllCoverImages());
    }

    @PostMapping
    public ResponseEntity<List<CommitteeCoverImage>> createCoverImages(
            @RequestParam(value = "mainImage", required = false) MultipartFile mainImage,
            @RequestParam(value = "secondaryImages", required = false) MultipartFile[] secondaryImages) {
        
        List<CommitteeCoverImage> createdCovers = coverImageService.saveCoverImages(mainImage, secondaryImages);
        return new ResponseEntity<>(createdCovers, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommitteeCoverImage> updateCoverImage(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "isMain", required = false) Boolean isMain) {
        
        CommitteeCoverImage updatedCover = coverImageService.updateCoverImage(id, imageFile, isMain);
        return ResponseEntity.ok(updatedCover);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoverImage(@PathVariable Long id) {
        coverImageService.deleteCoverImage(id);
        return ResponseEntity.noContent().build();
    }
}
