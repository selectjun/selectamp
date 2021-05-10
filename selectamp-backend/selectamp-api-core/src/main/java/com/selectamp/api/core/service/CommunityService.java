package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.CommunityDto;
import com.selectamp.api.core.domain.CommunityEntity;
import com.selectamp.api.core.domain.CommunityKindsCodeEntity;
import com.selectamp.api.core.mapper.CommunityCommentMapper;
import com.selectamp.api.core.mapper.CommunityKindsCodeMapper;
import com.selectamp.api.core.mapper.CommunityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    /**
     * Community Mapper
     */
    private final CommunityMapper communityMapper;

    /**
     * Community Kinds Code Mapper
     */
    private final CommunityKindsCodeMapper communityKindsCodeMapper;

    /**
     * Community Comment Mapper
     */
    private final CommunityCommentMapper communityCommentMapper;

    /**
     * 커뮤니티 등록
     * @param communityEntity   커뮤니티 객체
     * @return                  커뮤니티 아이디
     */
    public Long insertCommunity(CommunityEntity communityEntity) {
        communityMapper.save(communityEntity);
        return communityEntity.getId();
    }

    public Long getSaveTempCount(String userId) {
        return communityMapper.countIsTempByUserId(userId);
    }

    /**
     * 커뮤니티 수정
     * @param communityEntity   커뮤니티 객체
     * @return                  커뮤니티 아이디
     */
    public Long modifyCommunity(CommunityEntity communityEntity) {
        communityMapper.modify(communityEntity);
        return communityEntity.getId();
    }

    /**
     * 커뮤니티 조회수 증가
     * @param id    커뮤니티 아이디
     */
    public void increaseViewCount(Long id) {
        communityMapper.increaseViewCount(id);
    }

    /**
     * 커뮤니티 목록 조회
     * @param startId       시작 아이디
     * @param countPerPage  페이지 당 갯수
     * @return              커뮤니티 목록
     */
    public List<CommunityDto> getCommunityList(Long startId, Long countPerPage) {
        List<CommunityEntity> communityEntityList = communityMapper.findAll(startId, countPerPage);

        List<CommunityDto> communityDtoList = new ArrayList<>();
        for (CommunityEntity communityEntity: communityEntityList) {
            CommunityKindsCodeEntity communityKindsCodeEntity = communityKindsCodeMapper.findByName(communityEntity.getCommunityKindsCodeName());
            Long commentCount = communityCommentMapper.countByCommunityId(communityEntity.getId());
            CommunityDto communityDto = CommunityDto.builder()
                    .id(communityEntity.getId())
                    .communityKindsCode(communityKindsCodeEntity)
                    .title(communityEntity.getTitle())
                    .contents(communityEntity.getContents())
                    .viewCount(communityEntity.getViewCount())
                    .commentCount(commentCount)
                    .isOpen(communityEntity.getIsOpen())
                    .isTemp(communityEntity.getIsTemp())
                    .createAt(communityEntity.getCreateAt())
                    .updateAt(communityEntity.getUpdateAt())
                    .userId(communityEntity.getUserId())
                    .build();
            communityDtoList.add(communityDto);
        }

        return communityDtoList;
    }

    /**
     * 커뮤니티 목록 조회 by isTemp and userId
     * @param isTemp    임시저장 여부
     * @param userId    사용자 아이디
     * @return          커뮤니티 목록
     */
    public List<CommunityEntity> getCommunityByIsTempAndUserId(Boolean isTemp, String userId) {
         return communityMapper.findAllByIsTempAndUserId(isTemp, userId);
    }

    /**
     * 커뮤니티 조회
     * @param id    아이디
     * @return      커뮤니티 객체
     */
    public CommunityDto getCommunity(Long id) {
        CommunityEntity communityEntity = communityMapper.findById(id);
        CommunityKindsCodeEntity communityKindsCodeEntity = communityKindsCodeMapper.findByName(communityEntity.getCommunityKindsCodeName());
        Long commentCount = communityCommentMapper.countByCommunityId(communityEntity.getId());
        CommunityDto communityDto = CommunityDto.builder()
                .id(communityEntity.getId())
                .communityKindsCode(communityKindsCodeEntity)
                .title(communityEntity.getTitle())
                .contents(communityEntity.getContents())
                .viewCount(communityEntity.getViewCount())
                .commentCount(commentCount)
                .isOpen(communityEntity.getIsOpen())
                .isTemp(communityEntity.getIsTemp())
                .createAt(communityEntity.getCreateAt())
                .updateAt(communityEntity.getUpdateAt())
                .userId(communityEntity.getUserId())
                .build();
        return communityDto;
    }

    /**
     * 커뮤니티 총 갯수 조회
     * @return  커뮤니티 총 갯수
     */
    public Long countCommunity() {
        return communityMapper.countAll();
    }

    /**
     * 커뮤니티 삭제
     * @param id    아이디
     */
    public void deleteCommunity(Long id) {
        communityMapper.destroyById(id);
    }

    /**
     * 커뮤니티 수정 가능 여부 확인
     * @param id        커뮤니티 아이디
     * @param userId    사용자 아이디
     * @return          수정 가능 여부
     */
    public Boolean isModify(Long id, String userId) {
       CommunityEntity communityEntity = communityMapper.findById(id);
        return userId.equals(communityEntity.getUserId()) ? true : false;
    }

}
