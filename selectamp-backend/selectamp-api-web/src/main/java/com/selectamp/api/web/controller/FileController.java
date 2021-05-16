package com.selectamp.api.web.controller;

import com.selectamp.api.core.domain.FileEntity;
import com.selectamp.api.core.service.FileService;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import com.sun.javafx.fxml.builder.URLBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {

    @Value("${site.url}")
    private String siteUrl;

    /**
     * JWT Token Provider
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * File Service
     */
    private final FileService fileService;

    /**
     * 파일 업로드
     * @param httpServletRequest    요청 객체
     * @param file                  파일 객체
     * @return
     */
    @PostMapping("/")
    public ResponseEntity insertFile(HttpServletRequest httpServletRequest, @RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (file.isEmpty()) {
                response.put("success", false);
                response.put("message", "파일이 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            // 사용자 조회
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            String userId = jwtTokenProvider.getUserPk(token);
            if (userId.equals("") && userId == null) {
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다");
                return ResponseEntity.badRequest().body(response);
            }

            FileEntity fileEntity = fileService.insertFile(file, userId);
            if (fileEntity == null) {
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

            String url = (siteUrl + "/api/file/" + Long.toString(fileEntity.getId()) + "/").replace("\"", "");

            response.put("success", true);
            response.put("url", url);
            response.put("name", fileEntity.getSaveName());
            response.put("size", file.getSize());

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "파일 업로드 중, 에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    };

    @GetMapping("/{id}/")
    public ResponseEntity<?> serveFile(@PathVariable Long id, HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            Resource resource = fileService.getFileById(id);
            if (resource == null) {
                response.put("success", false);
                response.put("message", "파일이 존재하지 않습니다");
                return ResponseEntity.status(404).body(response);
            }

            String contentType = httpServletRequest.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            if(contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "파일이 존재하지 않습니다");
            return ResponseEntity.status(404).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
