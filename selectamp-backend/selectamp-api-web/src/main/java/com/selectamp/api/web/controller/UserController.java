package com.selectamp.api.web.controller;

import com.selectamp.api.core.domain.UserEntity;
import com.selectamp.api.core.service.UserService;
import com.selectamp.api.core.util.ValidationProvider;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    /**
     * User Service
     */
    private final UserService userService;

    /**
     * Validation Provider
     */
    private final ValidationProvider validationProvider;

    /**
     * Jwt Token Provider
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 사용자 회원 가입
     * @param userEntity    회원 정보 객체
     * @param errors        유효성 객체
     * @return              회원 가입 성공 여부
     */
    @PostMapping("/")
    public ResponseEntity<Object> join(@Valid UserEntity userEntity, Errors errors) {
        Map<String, Object> response = new HashMap<>();

        // 유효성 체크
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(validationProvider.valid(errors));
        }

        // 약관동의 체크
        if (!userEntity.getIsAgree()) {
            response.put("success", false);
            response.put("message", "약관동의를 해주세요");
            return ResponseEntity.badRequest().body(response);
        }

        // 회원 중복 확인
        if (userService.duplicate(userEntity.getId())) {
            response.put("success", false);
            response.put("message", "아이디가 존재합니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 회원 가입
        try {
            response.put("success", true);
            response.put("id", userService.join(userEntity));
        } catch (NoSuchAlgorithmException e) {
            response.put("success", false);
            response.put("message", "암호화 에러 발생");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        return ResponseEntity.ok().body(response);
    }

    /**
     * 토큰에서 아이디 가져오기
     * @param httpServletRequest    요청 객체
     * @return                      아이디
     */
    @GetMapping("/id/")
    public ResponseEntity<Object> getUserId(HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            String userId = jwtTokenProvider.getUserPk(token);
            
            response.put("success", true);
            response.put("id", userId);
            
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
