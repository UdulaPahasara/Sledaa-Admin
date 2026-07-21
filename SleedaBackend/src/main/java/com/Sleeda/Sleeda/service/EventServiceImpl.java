package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.EventResponse;
import com.Sleeda.Sleeda.entity.Event;
import com.Sleeda.Sleeda.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public EventResponse createEvent(String title, String description, MultipartFile coverImage) throws Exception {
        String coverImageUrl = "";
        if (coverImage != null && !coverImage.isEmpty()) {
            coverImageUrl = fileStorageService.storeFile(coverImage, "events/covers");
        }

        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setCoverImageUrl(coverImageUrl);

        Event savedEvent = eventRepository.save(event);

        return mapToResponse(savedEvent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return mapToResponse(event);
    }

    @Override
    @Transactional
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    @Transactional
    public EventResponse updateEvent(Long eventId, String title, String description, MultipartFile coverImage) throws Exception {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        if (title != null && !title.isEmpty()) {
            event.setTitle(title);
        }

        if (description != null && !description.isEmpty()) {
            event.setDescription(description);
        }

        if (coverImage != null && !coverImage.isEmpty()) {
            String coverImageUrl = fileStorageService.storeFile(coverImage, "events/covers");
            event.setCoverImageUrl(coverImageUrl);
        }

        Event updatedEvent = eventRepository.save(event);
        return mapToResponse(updatedEvent);
    }

    private EventResponse mapToResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getCoverImageUrl(),
                event.getCreatedAt()
        );
    }
}
