package com.selectamp.api.core.util.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class FileFilter {

    private static final String[] BAD_EXTENSION = {"jpg", "jpeg", "png", "mp4"};

    public static void badFileExtIsReturnException(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1, originalFilename.length()).toLowerCase();

        Boolean isBadFileExt = true;
        for (int i = 0; i < BAD_EXTENSION.length; i++) {
            if (extension.equals(BAD_EXTENSION[i])) {
                isBadFileExt = false;
            }
        }

        if (isBadFileExt) {
            throw new IOException("BAD EXTENSION FILE UPLOAD");
        }
    }

    public static Boolean badFileExtIsReturnBoolean(MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1, originalFilename.length()).toLowerCase();

        Boolean isBadFileExt = true;
        for (int i = 0; i < BAD_EXTENSION.length; i++) {
            if (extension.equals(BAD_EXTENSION[i])) {
                isBadFileExt = false;
            }
        }

        return isBadFileExt;
    }

}
