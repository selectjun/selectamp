package com.selectamp.api.core.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityEntity extends TimeEntity {

    /**
     * COMMUNITY_ID
     */
    private Long id;

    /**
     * 커뮤니티_코드_이름
     */
    private String communityKindsCodeName;

    /**
     * 제목
     */
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    /**
     * 내용
     */
    @NotBlank(message = "내용을 입력해주세요")
    private String contents;

    /**
     * 조회수
     */
    @Builder.Default
    private Long viewCount = 0L;

    /**
     * 공개여부
     */
    @Builder.Default
    private Boolean isOpen = true;

    /**
     * 임시저장여부
     */
    @Builder.Default
    private Boolean isTemp = false;

    /**
     * 등록자
     */
    private String userId;

}
