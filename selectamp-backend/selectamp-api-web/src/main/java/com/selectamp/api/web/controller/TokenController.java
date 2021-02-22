package com.selectamp.api.web.controller;

import com.selectamp.api.core.domain.UserEntity;
import com.selectamp.api.core.service.UserAuthorityService;
import com.selectamp.api.core.service.UserService;
import com.selectamp.api.core.util.ValidationProvider;
import com.selectamp.api.core.domain.UserTokenDto;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class TokenController {

    /**
     * User Service
     */
    private final UserService userService;

    /**
     * User Authority Service
     */
    private final UserAuthorityService userAuthorityService;

    /**
     * JWT Component
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Validation Component
     */
    private final ValidationProvider validationProvider;

    @PostMapping("/")
    public ResponseEntity<Object> token(@Valid UserTokenDto userTokenDto, HttpServletResponse httpServletResponse, Errors errors) {
        Map<String, Object> response = new HashMap<>();

        // 유효성 체크
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(validationProvider.valid(errors));
        }

        // 회원 정보 확인
        UserEntity userEntity = userService.getUser(userTokenDto.getId());
        if (userEntity == null) {
            response.put("success", false);
            response.put("message", "회원정보가 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 패스워드 일치 여부 확인
        if (!userTokenDto.getPassword().equals(userEntity.getPassword())) {
            response.put("success", false);
            response.put("message", "패스워드가 맞지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 회원 권한 확인
        List<String> roles = userAuthorityService.getUserAuthorityNameList(userTokenDto.getId());
        if (roles == null) {
            response.put("success", false);
            response.put("message", "접근권한이 없습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // Access Token 발급
        response.put("success", true);
        httpServletResponse.addHeader("X-AUTH-TOKEN", jwtTokenProvider.createToken(userTokenDto.getId(), roles));

        return ResponseEntity.ok().body(response);
    };

}
