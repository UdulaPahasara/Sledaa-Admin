package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.CommitteeMemberResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface CommitteeMemberService {
    CommitteeMemberResponse createMember(String name, String position, Integer displayOrder, MultipartFile image) throws Exception;
    List<CommitteeMemberResponse> getAllMembers();
    CommitteeMemberResponse getMemberById(Long id);
    void deleteMember(Long memberId);
    CommitteeMemberResponse updateMember(Long memberId, String name, String position, Integer displayOrder, MultipartFile image) throws Exception;
}
