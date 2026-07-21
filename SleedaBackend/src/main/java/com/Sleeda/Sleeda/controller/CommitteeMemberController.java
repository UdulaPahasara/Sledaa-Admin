package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.dto.response.CommitteeMemberResponse;
import com.Sleeda.Sleeda.service.CommitteeMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/committee")
@RequiredArgsConstructor
public class CommitteeMemberController {

    private final CommitteeMemberService committeeMemberService;

    @PostMapping
    public ResponseEntity<?> createMember(
            @RequestParam("name") String name,
            @RequestParam("position") String position,
            @RequestParam(value = "displayOrder", required = false) Integer displayOrder,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            CommitteeMemberResponse response = committeeMemberService.createMember(name, position, displayOrder, image);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<CommitteeMemberResponse>> getAllMembers() {
        return new ResponseEntity<>(committeeMemberService.getAllMembers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable Long id) {
        try {
            CommitteeMemberResponse response = committeeMemberService.getMemberById(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        try {
            committeeMemberService.deleteMember(id);
            return new ResponseEntity<>("Committee member deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "position", required = false) String position,
            @RequestParam(value = "displayOrder", required = false) Integer displayOrder,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            CommitteeMemberResponse response = committeeMemberService.updateMember(id, name, position, displayOrder, image);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
