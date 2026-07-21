package com.Sleeda.Sleeda.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalFileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public String storeFile(MultipartFile file, String directory) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Create the directory if it doesn't exist
        Path dirPath = Paths.get(uploadDir, directory).toAbsolutePath().normalize();
        Files.createDirectories(dirPath);

        // Generate a unique file name
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";
        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String newFilename = UUID.randomUUID().toString() + fileExtension;

        // Copy file to the target location (Replacing existing file with the same name)
        Path targetLocation = dirPath.resolve(newFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Return the relative URL path to access the file
        // For example: /uploads/albums/123e4567-e89b-12d3-a456-426614174000.jpg
        return "/" + uploadDir + "/" + directory + "/" + newFilename;
    }
}
