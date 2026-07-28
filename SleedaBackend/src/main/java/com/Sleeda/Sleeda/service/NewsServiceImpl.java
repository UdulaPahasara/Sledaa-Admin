package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.NewsResponse;
import com.Sleeda.Sleeda.entity.News;
import com.Sleeda.Sleeda.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public NewsResponse createNews(String title, String description, MultipartFile coverImage) throws Exception {
        String coverImageUrl = "";
        if (coverImage != null && !coverImage.isEmpty()) {
            coverImageUrl = fileStorageService.storeFile(coverImage, "news/covers");
        }

        News news = new News();
        news.setTitle(title);
        news.setDescription(description);
        news.setCoverImageUrl(coverImageUrl);

        News savedNews = newsRepository.save(news);
        return mapToResponse(savedNews);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NewsResponse> getAllNews() {
        return newsRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public NewsResponse getNewsById(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
        return mapToResponse(news);
    }

    @Override
    @Transactional
    public void deleteNews(Long newsId) {
        newsRepository.findById(newsId).ifPresent(news -> {
            fileStorageService.deleteFile(news.getCoverImageUrl());
            newsRepository.delete(news);
        });
    }

    @Override
    @Transactional
    public NewsResponse updateNews(Long newsId, String title, String description, MultipartFile coverImage) throws Exception {
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new RuntimeException("News not found with id: " + newsId));

        if (title != null && !title.isEmpty()) {
            news.setTitle(title);
        }
        if (description != null && !description.isEmpty()) {
            news.setDescription(description);
        }
        if (coverImage != null && !coverImage.isEmpty()) {
            String coverImageUrl = fileStorageService.storeFile(coverImage, "news/covers");
            news.setCoverImageUrl(coverImageUrl);
        }

        News updatedNews = newsRepository.save(news);
        return mapToResponse(updatedNews);
    }

    private NewsResponse mapToResponse(News news) {
        return new NewsResponse(
                news.getId(),
                news.getTitle(),
                news.getDescription(),
                news.getCoverImageUrl(),
                news.getCreatedAt()
        );
    }
}
