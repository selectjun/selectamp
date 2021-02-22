package com.selectamp.api.core.service;

import com.selectamp.api.core.domain.UserAuthorityEntity;
import com.selectamp.api.core.domain.UserEntity;
import com.selectamp.api.core.mapper.UserAuthorityMapper;
import com.selectamp.api.core.mapper.UserMapper;
import com.selectamp.api.core.util.cryption.Aes256;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class UserService {

    /**
     * User Mapper
     */
    private final UserMapper userMapper;

    /**
     * User Authority Mapper
     */
    private final UserAuthorityMapper userAuthorityMapper;

    /**
     * AES-256 Cryption Component
     */
    private final Aes256 aes256;

    /**
     * 회원 가입
     * @param userEntity    회원 정보 객체
     * @return              회원 아이디
     */
    @Transactional
    public String join(UserEntity userEntity) throws NoSuchAlgorithmException {
        userMapper.save(userEntity.toEncryptionEntity(aes256));

        UserAuthorityEntity userAuthorityEntity = new UserAuthorityEntity();
        userAuthorityEntity.setUserId(userEntity.getId());
        userAuthorityEntity.setAuthorityName("ROLE_USER01");
        userAuthorityMapper.save(userAuthorityEntity);

        return userEntity.getId();
    }

    /**
     * 회원 중복 확인
     * @param id    회원 아이디
     * @return      중복 여부(true: 중복, false: 미중복)
     */
    public Boolean duplicate(String id) {
        return userMapper.countById(id) >= 1;
    }

    /**
     * 회원 정보 조회
     * @param id    회원 ID
     * @return      회원 정보
     */
    public UserEntity getUser(String id) {
        return userMapper.findById(id);
    }


}
