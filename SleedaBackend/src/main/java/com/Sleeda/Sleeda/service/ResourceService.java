package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ResourceResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ResourceService {
    ResourceResponse createResource(String title, MultipartFile file) throws Exception;
    List<ResourceResponse> getAllResources();
    ResourceResponse getResourceById(Long id);
    void deleteResource(Long resourceId);
    ResourceResponse updateResource(Long resourceId, String title, MultipartFile file) throws Exception;
}
