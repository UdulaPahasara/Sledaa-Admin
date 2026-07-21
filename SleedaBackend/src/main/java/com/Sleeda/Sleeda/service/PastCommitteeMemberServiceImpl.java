package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import com.Sleeda.Sleeda.repository.PastCommitteeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class PastCommitteeMemberServiceImpl implements PastCommitteeMemberService {

    @Autowired
    private PastCommitteeMemberRepository memberRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public List<PastCommitteeMember> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Optional<PastCommitteeMember> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public PastCommitteeMember saveMember(String name, String position, MultipartFile imageFile) {
        PastCommitteeMember member = new PastCommitteeMember();
        member.setName(name);
        member.setPosition(position);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String imageUrl = fileStorageService.storeFile(imageFile, "past_committee");
                member.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to store image file", e);
            }
        }

        return memberRepository.save(member);
    }

    @Override
    public PastCommitteeMember updateMember(Long id, String name, String position, MultipartFile imageFile) {
        PastCommitteeMember member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Past committee member not found with id: " + id));

        if (name != null) member.setName(name);
        if (position != null) member.setPosition(position);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String imageUrl = fileStorageService.storeFile(imageFile, "past_committee");
                member.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to store image file", e);
            }
        }

        return memberRepository.save(member);
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.findById(id).ifPresent(member -> {
            memberRepository.delete(member);
        });
    }
}
