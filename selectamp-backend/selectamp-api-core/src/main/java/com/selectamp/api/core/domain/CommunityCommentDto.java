package com.selectamp.api.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityCommentDto extends TimeEntity {

    /**
     * 커뮤니티 댓글 아이디
     */
    Long id;

    /**
     * 커뮤니티 아이디
     */
    Long communityId;

    /**
     * 부모 커뮤니티 댓글 갯수
     */
    @Builder.Default
    Long parentCommentCount = 0L;

    /**
     * 자식 커뮤니티 댓글 갯수
     */
    @Builder.Default
    Long childCommentCount = 0L;

    /**
     * 내용
     */
    String contents;

    /**
     * 말줄임 여부
     */
    @Builder.Default
    Boolean isToShortWords = false;

    /**
     * 등록자
     */
    String userId;

}
