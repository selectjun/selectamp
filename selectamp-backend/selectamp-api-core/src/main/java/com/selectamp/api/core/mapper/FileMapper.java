package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.FileEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FileMapper {

    /**
     * 파일 등록
     * @param fileEntity    파일 객체
     * @return              파일 아이디
     */
    public Long save(FileEntity fileEntity);

    /**
     * 파일 조회
     * @param id    파일 아이디
     * @return      파일 객체
     */
    public FileEntity findOneById(@Param("id") Long id);

}
