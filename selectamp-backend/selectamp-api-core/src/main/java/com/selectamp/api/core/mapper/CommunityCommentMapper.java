package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.CommunityCommentDto;
import com.selectamp.api.core.domain.CommunityCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommunityCommentMapper {

    /**
     *
     * @param communityCommentEntity
     */
    public void save(CommunityCommentEntity communityCommentEntity);

    /**
     *
     * @param id
     * @return
     */
    public CommunityCommentEntity findOneById(@Param("id") Long id);

    /**
     *
     * @param communityId
     * @return
     */
    public List<CommunityCommentDto> findAllWithChildCommentCountByCommunityId(@Param("communityId") Long communityId, @Param("startId") Long startId, @Param("commentCountPerPage") Long commentCountPerPage);

    /**
     *
     * @param communityId
     * @param parentCommentId
     * @return
     */
    public List<CommunityCommentDto> findAllByCommunityIdAndParentCommentId(@Param("communityId") Long communityId
            , @Param("parentCommentId") Long parentCommentId
            , @Param("startId") Long startId
            , @Param("commentCountPerPage") Long commentCountPerPage);

    /**
     *
     * @param communityId
     * @return
     */
    public Long countByCommunityId(@Param("communityId") Long communityId);

    /**
     *
     * @param id
     */
    public void destroyById(@Param("id") Long id);

}
