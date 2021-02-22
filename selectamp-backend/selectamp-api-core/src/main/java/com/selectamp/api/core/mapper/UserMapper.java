package com.selectamp.api.core.mapper;

import com.selectamp.api.core.domain.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    /**
     * 회원 정보 조회
     * @param id    회원 아이디
     * @return      회원 정보 객체
     */
    public UserEntity findById(@Param("id") String id);

    /**
     * 회원 명수 by id
     * @param id    회원 아이디
     * @return      회원 명수
     */
    public Long countById(@Param("id") String id);

    /**
     * 회원 정보 저장
     * @param userEntity    회원 정보
     * @return              회원 ID
     */
    public void save(UserEntity userEntity);

}
