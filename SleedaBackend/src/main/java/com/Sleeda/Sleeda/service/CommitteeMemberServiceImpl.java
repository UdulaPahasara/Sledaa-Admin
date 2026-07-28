package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.CommitteeMemberResponse;
import com.Sleeda.Sleeda.entity.CommitteeMember;
import com.Sleeda.Sleeda.repository.CommitteeMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommitteeMemberServiceImpl implements CommitteeMemberService {

    private final CommitteeMemberRepository committeeMemberRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public CommitteeMemberResponse createMember(String name, String position, Integer displayOrder, MultipartFile image) throws Exception {
        String imageUrl = "";
        if (image != null && !image.isEmpty()) {
            imageUrl = fileStorageService.storeFile(image, "committee/images");
        }

        CommitteeMember member = new CommitteeMember();
        member.setName(name);
        member.setPosition(position);
        member.setImageUrl(imageUrl);
        member.setDisplayOrder(displayOrder != null ? displayOrder : 0);

        CommitteeMember savedMember = committeeMemberRepository.save(member);
        return mapToResponse(savedMember);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommitteeMemberResponse> getAllMembers() {
        return committeeMemberRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CommitteeMemberResponse getMemberById(Long id) {
        CommitteeMember member = committeeMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Committee Member not found with id: " + id));
        return mapToResponse(member);
    }

    @Override
    @Transactional
    public void deleteMember(Long memberId) {
        committeeMemberRepository.findById(memberId).ifPresent(member -> {
            fileStorageService.deleteFile(member.getImageUrl());
            committeeMemberRepository.delete(member);
        });
    }

    @Override
    @Transactional
    public CommitteeMemberResponse updateMember(Long memberId, String name, String position, Integer displayOrder, MultipartFile image) throws Exception {
        CommitteeMember member = committeeMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Committee Member not found with id: " + memberId));

        if (name != null && !name.isEmpty()) {
            member.setName(name);
        }
        if (position != null && !position.isEmpty()) {
            member.setPosition(position);
        }
        if (displayOrder != null) {
            member.setDisplayOrder(displayOrder);
        }
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image, "committee/images");
            member.setImageUrl(imageUrl);
        }

        CommitteeMember updatedMember = committeeMemberRepository.save(member);
        return mapToResponse(updatedMember);
    }

    private CommitteeMemberResponse mapToResponse(CommitteeMember member) {
        return new CommitteeMemberResponse(
                member.getId(),
                member.getName(),
                member.getPosition(),
                member.getImageUrl(),
                member.getDisplayOrder(),
                member.getCreatedAt()
        );
    }
}
