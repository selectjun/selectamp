package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.FileEntity;
import com.selectamp.api.core.mapper.FileMapper;
import com.selectamp.api.core.util.filter.FileFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${upload.rootPath}")
    private String uploadRootPath;

    /**
     * File Mapper
     */
    private final FileMapper fileMapper;

    public FileEntity insertFile(MultipartFile multipartFile, String userId) throws IOException {
        String uploadPath = uploadRootPath;
        File file = new File(uploadPath);

        if (!file.isDirectory()) {
            Boolean isMake = file.mkdir();
        }

        FileFilter .badFileExtIsReturnException(multipartFile);

        String originalName = multipartFile.getOriginalFilename();
        String extension = originalName.split("\\.")[1];
        String saveName = Calendar.getInstance().getTimeInMillis() + "." + extension;

        FileEntity fileEntity = new FileEntity();
        fileEntity.setOriginalName(originalName);
        fileEntity.setSaveName(saveName);
        fileEntity.setUserId(userId);

        byte[] bytes = multipartFile.getBytes();
        Path path = Paths.get(uploadPath + "/" + saveName);
        Files.write(path, bytes);

        fileMapper.save(fileEntity);
        return fileEntity;
    };

    /**
     * 파일 조회 by id
     * @param id    파일 아이디
     * @return      파일 객체
     */
    public Resource getFileById(Long id) throws FileNotFoundException, MalformedURLException {
        FileEntity fileEntity = fileMapper.findOneById(id);

        if (fileEntity == null) {
            return null;
        }

        Path uploadPath = Paths.get(uploadRootPath + "/" + fileEntity.getSaveName());
        Resource resource = new UrlResource(uploadPath.toUri());

        if (resource.exists()) {
            return resource;
        } else {
            throw new FileNotFoundException();
        }

    };

}
