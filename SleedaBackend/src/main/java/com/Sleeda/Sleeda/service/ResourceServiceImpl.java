package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ResourceResponse;
import com.Sleeda.Sleeda.entity.Resource;
import com.Sleeda.Sleeda.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public ResourceResponse createResource(String title, MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resource file is required");
        }

        String fileUrl = fileStorageService.storeFile(file, "resources/documents");
        String originalFilename = file.getOriginalFilename();

        Resource resource = new Resource();
        resource.setTitle(title);
        resource.setFilename(originalFilename != null ? originalFilename : "document.pdf");
        resource.setFileUrl(fileUrl);

        Resource savedResource = resourceRepository.save(resource);
        return mapToResponse(savedResource);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResourceResponse> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResourceResponse getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
        return mapToResponse(resource);
    }

    @Override
    @Transactional
    public void deleteResource(Long resourceId) {
        resourceRepository.findById(resourceId).ifPresent(resource -> {
            fileStorageService.deleteFile(resource.getFileUrl());
            resourceRepository.delete(resource);
        });
    }

    @Override
    @Transactional
    public ResourceResponse updateResource(Long resourceId, String title, MultipartFile file) throws Exception {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + resourceId));

        if (title != null && !title.isEmpty()) {
            resource.setTitle(title);
        }

        if (file != null && !file.isEmpty()) {
            String fileUrl = fileStorageService.storeFile(file, "resources/documents");
            String originalFilename = file.getOriginalFilename();
            resource.setFileUrl(fileUrl);
            resource.setFilename(originalFilename != null ? originalFilename : "document.pdf");
        }

        Resource updatedResource = resourceRepository.save(resource);
        return mapToResponse(updatedResource);
    }

    private ResourceResponse mapToResponse(Resource resource) {
        return new ResourceResponse(
                resource.getId(),
                resource.getTitle(),
                resource.getFilename(),
                resource.getFileUrl(),
                resource.getCreatedAt()
        );
    }
}
