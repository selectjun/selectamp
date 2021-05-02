package com.selectamp.api.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityCommentEntity extends TimeEntity {

    /**
     * 커뮤니티 댓글 아이디
     */
    Long id;

    /**
     * 커뮤니티 아이디
     */
    Long communityId;

    /**
     * 부모 커뮤니티 댓글 아이디
     */
    Long parentCommentId;

    /**
     * 내용
     */
        String contents;

    /**
     * 등록자
     */
    String userId;

}
