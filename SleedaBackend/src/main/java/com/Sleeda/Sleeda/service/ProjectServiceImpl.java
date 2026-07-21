package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ProjectResponse;
import com.Sleeda.Sleeda.entity.Project;
import com.Sleeda.Sleeda.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public ProjectResponse createProject(String title, String description, MultipartFile coverImage) throws Exception {
        String coverImageUrl = "";
        if (coverImage != null && !coverImage.isEmpty()) {
            coverImageUrl = fileStorageService.storeFile(coverImage, "projects/covers");
        }

        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setCoverImageUrl(coverImageUrl);

        Project savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Override
    @Transactional
    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(Long projectId, String title, String description, MultipartFile coverImage) throws Exception {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        if (title != null && !title.isEmpty()) {
            project.setTitle(title);
        }
        if (description != null && !description.isEmpty()) {
            project.setDescription(description);
        }
        if (coverImage != null && !coverImage.isEmpty()) {
            String coverImageUrl = fileStorageService.storeFile(coverImage, "projects/covers");
            project.setCoverImageUrl(coverImageUrl);
        }

        Project updatedProject = projectRepository.save(project);
        return mapToResponse(updatedProject);
    }

    private ProjectResponse mapToResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCoverImageUrl(),
                project.getCreatedAt()
        );
    }
}
