package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import com.Sleeda.Sleeda.service.PastCommitteeMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/past-committee")
public class PastCommitteeMemberController {

    @Autowired
    private PastCommitteeMemberService memberService;

    @GetMapping
    public ResponseEntity<List<PastCommitteeMember>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @PostMapping
    public ResponseEntity<PastCommitteeMember> createMember(
            @RequestParam("name") String name,
            @RequestParam("position") String position,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        
        PastCommitteeMember createdMember = memberService.saveMember(name, position, imageFile);
        return new ResponseEntity<>(createdMember, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
