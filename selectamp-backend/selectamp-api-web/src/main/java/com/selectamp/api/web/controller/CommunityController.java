package com.selectamp.api.web.controller;

import com.selectamp.api.core.domain.CommunityCommentEntity;
import com.selectamp.api.core.domain.CommunityDto;
import com.selectamp.api.core.domain.CommunityEntity;
import com.selectamp.api.core.service.CommunityCommentService;
import com.selectamp.api.core.service.CommunityKindsCodeService;
import com.selectamp.api.core.service.CommunityService;
import com.selectamp.api.core.util.ValidationProvider;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

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
     * Community Comment Service
     */
    private final CommunityCommentService communityCommentService;

    /**
     * JWT Token Provider
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Validation Provider
     */
    private final ValidationProvider validationProvider;

    /**
     * 페이지 당 갯수
     */
    private final static Long countPerPage = 20L;

    /**
     * 페이지 당 댓글 갯수
     */
    private final static Long commentCountPerPage = 5L;


    /**
     * 커뮤니티 목록 조회
     * @param page  현재 페이지
     * @return      커뮤니티 목록
     */
    @GetMapping("/")
    public ResponseEntity<Object> getCommunities(@RequestParam(value = "page", required = false, defaultValue = "1") Long page) {
        Map<String, Object> response = new HashMap<>();
        Long startId = (page - 1) * countPerPage;

        try {
            response.put("success", true);
            response.put("page", page);
            response.put("countPerPage", countPerPage);
            response.put("totalCount", communityService.countCommunity());
            response.put("communities", communityService.getCommunityList(startId, countPerPage));
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * 커뮤니티 임시 저장 목록 조회
     * @param httpServletRequest
     * @return
     */
    @GetMapping("/isTemp/")
    public ResponseEntity<Object> getCommunities(HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 사용자 조회
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            String userId = jwtTokenProvider.getUserPk(token);
            if (userId.equals("") && userId == null) {
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다");
                return ResponseEntity.badRequest().body(response);
            }

            response.put("success", true);
            response.put("communities", communityService.getCommunityByIsTempAndUserId(true, userId));

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * 커뮤니티 조회
     * @param id 커뮤니티 아이디
     * @return
     */
    @GetMapping("/{id}/")
    public ResponseEntity<Object> getCommunity(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        // [id] 확인
        if (id == null) {
            response.put("success", false);
            response.put("message", "");
            return ResponseEntity.badRequest().body("[id]가 존재하지 않습니다");
        }

        // 조회
        CommunityDto communityDto = communityService.getCommunity(id);
        if (communityDto == null) {
            response.put("success", false);
            response.put("message", "");
            return ResponseEntity.badRequest().body("데이터가 존재하지 않습니다");
        }

        response.put("success", true);
        response.put("community", communityDto);

        return ResponseEntity.ok().body(response);

    }

    /**
     * 커뮤니티 수정
     * @param communityEntity       커뮤니티 객체
     * @param errors                유효성 객체
     * @param id                    커뮤니티 아이디
     * @param httpServletRequest    요청 객체
     * @return                      커뮤니티 수정 여부
     */
    @PutMapping("/{id}/")
    public ResponseEntity<Object> updateCommunity(@Valid CommunityEntity communityEntity, Errors errors,
                                         @PathVariable("id") Long id, HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        // 유효성 체크
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(validationProvider.valid(errors));
        }

        // 게시물 존재 여부 확인
        if (id == null) {
            response.put("success", false);
            response.put("message", "게시물이 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }
        communityEntity.setId(id);

        // 사용자 조회
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        String userId = jwtTokenProvider.getUserPk(token);
        if (userId.equals("") && userId == null) {
            response.put("success", false);
            response.put("message", "사용자가 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 수정 권한 확인
        if (!communityService.isModify(communityEntity.getId(), userId)) {
            response.put("success", false);
            response.put("message", "수정 권한이 없습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 커뮤니티 코드 확인
        if (!communityKindsCodeService.isCommunityKindsCode(communityEntity.getCommunityKindsCodeName())) {
            response.put("success", false);
            response.put("message", "코드가 존재하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        // 수정
        if (communityService.modifyCommunity(communityEntity) == null) {
            response.put("success", false);
            response.put("message", "등록에 실패하였습니다");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("success", true);
        response.put("id", id);
        response.put("message", "수정하였습니다");

        return ResponseEntity.ok().body(response);
    }

    /**
     * 조회수 증가
     * @return  성공여부
     */
    @PutMapping("/{id}/viewCount/")
    public ResponseEntity<Object> increaseCommunityViewCount(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            communityService.increaseViewCount(id);
            response.put("success", true);
            response.put("message", "성공하였습니다");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 커뮤니티 등록
     * @param communityEntity       커뮤니티 객체
     * @param errors                유효성 객체
     * @param httpServletRequest    요청 객체
     * @return                      등록 성공 여부
     */
    @PostMapping("/")
    public ResponseEntity<Object> insertCommunity(@Valid CommunityEntity communityEntity, Errors errors,
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

        // 임시저장 가능 갯수 확인
        Long saveTempCount = communityService.getSaveTempCount(userId);
        if (communityEntity.getIsTemp() && saveTempCount >= 10) {
            response.put("success", false);
            response.put("saveTempCount", saveTempCount);
            response.put("message", "최대 10개까지만 임시 저장이 가능합니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 등록
        Long id = communityService.insertCommunity(communityEntity);
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

    /**
     * 커뮤니티 삭제
     * @param id
     * @param httpServletRequest
     * @return
     */
    @DeleteMapping("/{id}/")
    public ResponseEntity<Object> deleteCommunity(@PathVariable Long id, HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 존재 여부 확인
            if (id == null) {
                response.put("success", false);
                response.put("message", communityCommentService);
                return ResponseEntity.badRequest().body(response);
            }

            // 권한 확인
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            String userId = jwtTokenProvider.getUserPk(token);
            if (!communityService.getCommunity(id).getUserId().equals(userId)) {
                response.put("success", false);
                response.put("message", "해당 게시물은 삭제 권한이 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            // 삭제 처리
            communityService.deleteCommunity(id);

            response.put("success", true);
            response.put("message", "삭제 성공하였습니다");

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 커뮤니티 코드 목록 조회
     * @return  커뮤니티 코드 목록
     */
    @GetMapping("/communityKindsCodeName/")
    public ResponseEntity<Object> getCommunityKindsCodeNames() {
        Map<String, Object> response = new HashMap<>();

        try {
            response.put("success", true);
            response.put("communityKindsCodeNames", communityKindsCodeService.getCommunityKindsCodeList());

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다.");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 커뮤니티 댓글 등록
     * @param communityCommentEntity    커뮤니티 댓글 객체
     * @return                          성공여부
     */
    @PostMapping("/comment/")
    public ResponseEntity<Object> insertCommunityComments(CommunityCommentEntity communityCommentEntity, HttpServletRequest httpServletRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 사용자 조회
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            String userId = jwtTokenProvider.getUserPk(token);
            if (userId.equals("") && userId == null) {
                response.put("success", false);
                response.put("message", "사용자가 존재하지 않습니다");
                return ResponseEntity.badRequest().body(response);
            }
            communityCommentEntity.setUserId(userId);

            Long parentCommentId = communityCommentEntity.getParentCommentId();
            if (parentCommentId != null) {
                Boolean isParentCommentId = communityCommentService.getCommentById(parentCommentId).getParentCommentId() != null;
                if (isParentCommentId) {
                    response.put("success", false);
                    response.put("message", "최대 2 Depth까지만 등록이 가능합니다");
                    return ResponseEntity.badRequest().body(response);
                }
            }

            Long communityCommentId = communityCommentService.insertCommunityComment(communityCommentEntity);
            if (communityCommentId == null) {
                response.put("success", false);
                response.put("message", "댓글 등록에 실패하였습니다");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

            response.put("success", true);
            response.put("comment", communityCommentService.getCommentById(communityCommentId));
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 커뮤니티 댓글 목록 조회
     * @param communityId
     * @return
     */
    @GetMapping("/comment/communityId/{communityId}/")
    public ResponseEntity<Object> getCommunityCommentList(@PathVariable("communityId") Long communityId
            , @RequestParam(value = "commentPage", defaultValue = "1") Long commentPage) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (communityId == null) {
                response.put("success", false);
                response.put("message", "[communityId]가 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            Long startId = (commentPage - 1) * commentCountPerPage;

            response.put("success", true);
            response.put("parentCommentCount", communityCommentService.getParentCommentCountByCommunityId(communityId));
            response.put("comments", communityCommentService.getCommentList(communityId, startId, commentCountPerPage));
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     *
     * @param id
     * @return
     */
    @GetMapping("/comment/{id}/")
    public ResponseEntity<Object> getComment(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (id == null) {
                response.put("success", false);
                response.put("message", "[id]가 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            response.put("success", true);
            response.put("message", "성공하였습니다");
            response.put("comment", communityCommentService.getCommentById(id));
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 자식 커뮤니티 댓글 목록 조회
     * @param communityId
     * @return
     */
    @GetMapping("/comment/communityId/{communityId}/{parentCommentId}/")
    public ResponseEntity<Object> getCommunityCommentChildList(@PathVariable("communityId") Long communityId
            , @PathVariable("parentCommentId") Long parentCommentId
            , @RequestParam(value = "commentPage", defaultValue = "1") Long commentPage) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (communityId == null) {
                response.put("success", false);
                response.put("message", "[communityId]가 없습니다");
                return ResponseEntity.badRequest().body(response);
            } else if (parentCommentId == null) {
                response.put("success", false);
                response.put("message", "[parentCommentId]가 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            Long startId = (commentPage - 1) * commentCountPerPage;

            response.put("success", true);
            response.put("commentCountPerPage", commentCountPerPage);
            response.put("comments", communityCommentService.getCommentChildList(communityId, parentCommentId, startId, commentCountPerPage));
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/comment/{id}/")
    public ResponseEntity<Object> deleteComment(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (id == null) {
                response.put("success", false);
                response.put("message", "[id]가 없습니다");
                return ResponseEntity.badRequest().body(response);
            }

            communityCommentService.deleteComment(id);

            response.put("success", true);
            response.put("message", "삭제 성공하였습니다");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
