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
     * 임시 저장 갯수
     * @param userId    회원 아이디
     * @return          임시 저장 갯수
     */
    public Long countIsTempByUserId(String userId);

    /**
     * 커뮤니티 수정
     * @param communityEntity   커뮤니티 객체
     */
    public void modify(CommunityEntity communityEntity);

    /**
     * 커뮤니티 삭제
     * @param id    아이디
     */
    public void destroyById(@Param("id") Long id);

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

    /**
     * 커뮤니티 목록 조회 by isTemp and userId
     * @param isTemp    임시저장 여부
     * @param userId    사용자 아이디
     * @return          커뮤니티 목록
     */
    public List<CommunityEntity> findAllByIsTempAndUserId(@Param("isTemp") Boolean isTemp, @Param("userId") String userId);

}
