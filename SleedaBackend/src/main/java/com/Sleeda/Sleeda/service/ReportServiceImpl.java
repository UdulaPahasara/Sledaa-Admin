package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ReportResponse;
import com.Sleeda.Sleeda.entity.Report;
import com.Sleeda.Sleeda.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public ReportResponse createReport(String title, MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Report file is required");
        }

        String fileUrl = fileStorageService.storeFile(file, "reports/documents");
        String originalFilename = file.getOriginalFilename();

        Report report = new Report();
        report.setTitle(title);
        report.setFilename(originalFilename != null ? originalFilename : "document.pdf");
        report.setFileUrl(fileUrl);

        Report savedReport = reportRepository.save(report);
        return mapToResponse(savedReport);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ReportResponse getReportById(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
        return mapToResponse(report);
    }

    @Override
    @Transactional
    public void deleteReport(Long reportId) {
        reportRepository.deleteById(reportId);
    }

    @Override
    @Transactional
    public ReportResponse updateReport(Long reportId, String title, MultipartFile file) throws Exception {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + reportId));

        if (title != null && !title.isEmpty()) {
            report.setTitle(title);
        }

        if (file != null && !file.isEmpty()) {
            String fileUrl = fileStorageService.storeFile(file, "reports/documents");
            String originalFilename = file.getOriginalFilename();
            report.setFileUrl(fileUrl);
            report.setFilename(originalFilename != null ? originalFilename : "document.pdf");
        }

        Report updatedReport = reportRepository.save(report);
        return mapToResponse(updatedReport);
    }

    private ReportResponse mapToResponse(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getTitle(),
                report.getFilename(),
                report.getFileUrl(),
                report.getCreatedAt()
        );
    }
}
