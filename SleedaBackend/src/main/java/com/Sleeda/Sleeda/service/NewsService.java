package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.NewsResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface NewsService {
    NewsResponse createNews(String title, String description, MultipartFile coverImage) throws Exception;
    List<NewsResponse> getAllNews();
    NewsResponse getNewsById(Long id);
    void deleteNews(Long newsId);
    NewsResponse updateNews(Long newsId, String title, String description, MultipartFile coverImage) throws Exception;
}
