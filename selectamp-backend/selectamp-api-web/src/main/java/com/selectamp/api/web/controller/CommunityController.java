package com.selectamp.api.web.controller;

import com.selectamp.api.core.domain.CommunityEntity;
import com.selectamp.api.core.domain.CommunityKindsCodeEntity;
import com.selectamp.api.core.service.CommunityKindsCodeService;
import com.selectamp.api.core.service.CommunityService;
import com.selectamp.api.core.util.ValidationProvider;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

    /**
     * Community Service
     */
    private final CommunityService communityService;

    /**
     * Community Kinds Code Service
     */
    private final CommunityKindsCodeService communityKindsCodeService;

    /**
     * JWT Token Provider
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Validation Provider
     */
    private final ValidationProvider validationProvider;

    @GetMapping("/")
    public String communication() {
        return "GET /api/communication/";
    }

    @PostMapping("/")
    public ResponseEntity<Object> write(@Valid CommunityEntity communityEntity, Errors errors,
                                        HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        // 유효성 체크
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(validationProvider.valid(errors));
        }

        // 사용자 조회
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        String userId = jwtTokenProvider.getUserPk(token);
        if (userId.equals("") && userId == null) {
            response.put("success", false);
            response.put("message", "사용자가 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }
        communityEntity.setUserId(userId);

        // 커뮤니티 코드 확인
        Boolean isCommunityKindsCode = communityKindsCodeService.isCommunityKindsCode(communityEntity.getCommunityKindsCodeName());
        if (!isCommunityKindsCode) {
            response.put("success", false);
            response.put("message", "코드가 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 등록
        Long id = communityService.save(communityEntity);
        if (id == null) {
            response.put("success", false);
            response.put("message", "등록에 실패하였습니다");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("success", true);
        response.put("id", id);
        response.put("message", "등록하였습니다");


        return ResponseEntity.ok().body(response);
    }

}
