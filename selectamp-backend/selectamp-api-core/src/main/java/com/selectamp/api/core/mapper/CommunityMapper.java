package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.CommunityEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommunityMapper {

    /**
     * 커뮤니티 저장
     * @param communityEntity   커뮤니티 객체
     */
    public void save(CommunityEntity communityEntity);

    /**
     * 커뮤니티 수정
     * @param communityEntity   커뮤니티 객체
     */
    public void modify(CommunityEntity communityEntity);

    /**
     * 커뮤니티 조회수 증가
     * @param id    커뮤니티 아이디
     */
    public void increaseViewCount(@Param("id") Long id);

    /**
     * 커뮤니티 목록 조회
     * @param startId       시작 아이디
     * @param countPerPage  페이지 당 갯수
     * @return              커뮤니티 목록
     */
    public List<CommunityEntity> findAll(@Param("startId") Long startId, @Param("countPerPage") Long countPerPage);

    /**
     * 커뮤니티 조회
     * @param id    커뮤니티 아이디
     * @return      커뮤니티 객체
     */
    public CommunityEntity findById(@Param("id") Long id);

    /**
     * 커뮤니티 총 갯수 조회
     * @return  커뮤니티 총 갯수
     */
    public Long countAll();

}
