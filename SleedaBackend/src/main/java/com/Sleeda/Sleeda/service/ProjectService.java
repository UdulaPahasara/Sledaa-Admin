package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ProjectResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ProjectService {
    ProjectResponse createProject(String title, String description, MultipartFile coverImage) throws Exception;
    List<ProjectResponse> getAllProjects();
    ProjectResponse getProjectById(Long id);
    void deleteProject(Long projectId);
    ProjectResponse updateProject(Long projectId, String title, String description, MultipartFile coverImage) throws Exception;
}
