package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.EventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EventService {
    EventResponse createEvent(String title, String description, MultipartFile coverImage) throws Exception;
    List<EventResponse> getAllEvents();
    EventResponse getEventById(Long id);
    void deleteEvent(Long eventId);
    EventResponse updateEvent(Long eventId, String title, String description, MultipartFile coverImage) throws Exception;
}
