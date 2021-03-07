package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.CommunityKindsCodeEntity;
import com.selectamp.api.core.mapper.CommunityKindsCodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityKindsCodeService {

    /**
     * Community Kinds Code Mapper
     */
    private final CommunityKindsCodeMapper communityKindsCodeMapper;

    /**
     * 커뮤니티 코드 확인 by name
     * @param name  커뮤니티 코드 이름
     * @return      커뮤니티 코드 존재 여부
     */
    public Boolean isCommunityKindsCode(String name) {
        CommunityKindsCodeEntity communityKindsCodeEntity = communityKindsCodeMapper.findByName(name);
        return communityKindsCodeEntity == null ? false : true;
    }

}
