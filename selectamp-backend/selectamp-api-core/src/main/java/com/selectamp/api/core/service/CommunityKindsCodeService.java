package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.CommunityKindsCodeEntity;
import com.selectamp.api.core.mapper.CommunityKindsCodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityKindsCodeService {

    /**
     * Community Kinds Code Mapper
     */
    private final CommunityKindsCodeMapper communityKindsCodeMapper;

    /**
     * 커뮤니티 코드 목록 조회
     * @return      커뮤니티 코드 목록
     */
    public List<CommunityKindsCodeEntity> getCommunityKindsCodeList() {
        return communityKindsCodeMapper.findAll();
    }

    /**
     * 커뮤니티 코드 조회 by name
     * @param name  커뮤니티 코드 이름
     * @return      커뮤니티 코드 존재 여부
     */
    public Boolean isCommunityKindsCode(String name) {
        CommunityKindsCodeEntity communityKindsCodeEntity = communityKindsCodeMapper.findByName(name);
        return communityKindsCodeEntity == null ? false : true;
    }

}
