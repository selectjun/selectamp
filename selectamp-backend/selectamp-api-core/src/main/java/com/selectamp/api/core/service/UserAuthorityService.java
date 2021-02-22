package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.UserAuthorityEntity;
import com.selectamp.api.core.mapper.UserAuthorityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAuthorityService {

    /**
     * User Authority Mapper
     */
    private final UserAuthorityMapper userAuthorityMapper;

    /**
     * 회원 권한 저장
     * @param userAuthorityEntity
     */
    public void save(UserAuthorityEntity userAuthorityEntity) {
        userAuthorityMapper.save(userAuthorityEntity);
    }

    /**
     * 회원 권한 목록 조회
     * @param userId    회원 아이디
     * @return          회원 권한 목록
     */
    public List<String> getUserAuthorityNameList(String userId) {
        return userAuthorityMapper.findAuthorityNameByUserId(userId);
    }

}
