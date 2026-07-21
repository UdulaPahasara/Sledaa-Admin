package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.response.ReportResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ReportService {
    ReportResponse createReport(String title, MultipartFile file) throws Exception;
    List<ReportResponse> getAllReports();
    ReportResponse getReportById(Long id);
    void deleteReport(Long reportId);
    ReportResponse updateReport(Long reportId, String title, MultipartFile file) throws Exception;
}
