package com.selectamp.api.web.config.webSecurity.service;

import com.selectamp.api.core.domain.UserDto;
import com.selectamp.api.core.mapper.UserAuthorityMapper;
import com.selectamp.api.core.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    /**
     * User Mapper
     */
    private final UserMapper userMapper;

    /**
     * User Authority Mapper
     */
    private final UserAuthorityMapper userAuthorityMapper;

    /**
     * 회원 조회
     * @param username  회원 구별 정보(아이디)
     * @return          회원 조획 결과
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto userDto = new UserDto();
        userDto = userDto.toUserDto(userMapper.findById(username));
        userDto.setRoles(userAuthorityMapper.findAuthorityNameByUserId(username));
        return userDto;
    }

}
