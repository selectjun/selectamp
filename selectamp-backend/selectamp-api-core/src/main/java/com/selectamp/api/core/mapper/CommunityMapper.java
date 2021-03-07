package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.CommunityEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityMapper {

    /**
     * 커뮤니티 저장
     * @param communityEntity   커뮤니티 객체
     */
    public void save(CommunityEntity communityEntity);

}
