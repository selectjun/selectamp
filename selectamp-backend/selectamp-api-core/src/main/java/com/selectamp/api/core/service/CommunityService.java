package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.CommunityEntity;
import com.selectamp.api.core.mapper.CommunityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityService {

    /**
     * Community Mapper
     */
    private final CommunityMapper communityMapper;

    /**
     * 커뮤니티 저장
     * @param communityEntity   커뮤니티 객체
     * @return                  커뮤니티 아이디
     */
    public Long save(CommunityEntity communityEntity) {
        communityMapper.save(communityEntity);
        return communityEntity.getId();
    }

}
