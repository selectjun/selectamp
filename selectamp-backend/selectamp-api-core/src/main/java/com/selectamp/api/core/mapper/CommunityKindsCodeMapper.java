package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.CommunityKindsCodeEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommunityKindsCodeMapper {

    /**
     * 커뮤니티 코드 목록 조회
     * @return  커뮤니티 코드 목록
     */
    public List<CommunityKindsCodeEntity> findAll();

    /**
     * 커뮤니티 코드 조회 by name
     * @param name  커뮤니티 코드 이름
     * @return      커뮤니티 코드 객체
     */
    public CommunityKindsCodeEntity findByName(@Param("name") String name);

}
