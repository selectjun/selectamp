package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.UserAuthorityEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserAuthorityMapper {

    /**
     * 회원 권한 저장
     * @param userAuthorityEntity 회원 권한 객체
     */
    public void save(UserAuthorityEntity userAuthorityEntity);

    /**
     * 회원 권한 조회(전체)
     * @param userId    회원 아이디
     * @return          회원 권한 전체 목록
     */
    public List<UserAuthorityEntity> findByUserId(@Param("userId") String userId);

    /**
     * 회원 권환 조회(권한명)
     * @param userId    회원 아이디
     * @return          권한 목록 권한명 목록
     */
    public List<String> findAuthorityNameByUserId(@Param("userId") String userId);

}
