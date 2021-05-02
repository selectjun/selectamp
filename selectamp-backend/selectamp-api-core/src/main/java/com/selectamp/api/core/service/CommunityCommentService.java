package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.CommunityCommentDto;
import com.selectamp.api.core.domain.CommunityCommentEntity;
import com.selectamp.api.core.mapper.CommunityCommentMapper;
import com.selectamp.api.core.util.data.CustomString;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityCommentService {

    private final CommunityCommentMapper communityCommentMapper;

    /**
     *
     * @param communityCommentEntity
     * @return
     */
    public Long insertCommunityComment(CommunityCommentEntity communityCommentEntity) {
        communityCommentMapper.save(communityCommentEntity);
        return communityCommentEntity.getId();
    }

    /**
     *
     * @param id
     * @return
     */
    public CommunityCommentEntity getCommentById(Long id) {
        return communityCommentMapper.findOneById(id);
    }

    /**
     * 커뮤니티 댓글 목록 조회
     * @param communityId
     * @return
     */
    public List<CommunityCommentDto> getCommentList(Long communityId, Long startId, Long commentCountPerPage) {
        List<CommunityCommentDto> beforeCommunityCommentDtoList = communityCommentMapper
                .findAllWithChildCommentCountByCommunityId(communityId, startId, commentCountPerPage);

        // 말줄임 처리
        List<CommunityCommentDto> afterCommunityCommentDtoList = new ArrayList<>();
        for (CommunityCommentDto communityCommentDto: beforeCommunityCommentDtoList) {
            if (communityCommentDto.getContents().length() > 20) {
                communityCommentDto.setContents(CustomString.toShortWords(communityCommentDto.getContents(), 10));
                communityCommentDto.setIsToShortWords(true);
            }
            afterCommunityCommentDtoList.add(communityCommentDto);
        }

        return afterCommunityCommentDtoList;
    }

    /**
     *
     * @param communityId
     * @param parentCommentId
     * @return
     */
    public List<CommunityCommentDto> getCommentChildList(Long communityId, Long parentCommentId, Long startId, Long commentCountPerPage) {
        List<CommunityCommentDto> beforeCommunityCommentDtoList = communityCommentMapper
                .findAllByCommunityIdAndParentCommentId(communityId, parentCommentId, startId, commentCountPerPage);

        // 말줄임 처리
        List<CommunityCommentDto> afterCommunityCommentDtoList = new ArrayList<>();
        for (CommunityCommentDto communityCommentDto: beforeCommunityCommentDtoList) {
            if (communityCommentDto.getContents().length() > 20) {
                communityCommentDto.setContents(CustomString.toShortWords(communityCommentDto.getContents(), 10));
                communityCommentDto.setIsToShortWords(true);
            }
            afterCommunityCommentDtoList.add(communityCommentDto);
        }

        return afterCommunityCommentDtoList;
    }

    /**
     *
     * @param id
     */
    public void deleteComment(Long id) {
        communityCommentMapper.destroyById(id);
    }

    /**
     *
     * @param communityId
     * @return
     */
    public Long getParentCommentCountByCommunityId(Long communityId) {
        return communityCommentMapper.countByCommunityId(communityId);
    }

}
