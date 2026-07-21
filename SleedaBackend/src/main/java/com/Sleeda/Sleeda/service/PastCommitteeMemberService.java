package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.entity.PastCommitteeMember;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;

public interface PastCommitteeMemberService {
    List<PastCommitteeMember> getAllMembers();
    Optional<PastCommitteeMember> getMemberById(Long id);
    PastCommitteeMember saveMember(String name, String position, MultipartFile imageFile);
    void deleteMember(Long id);
}
