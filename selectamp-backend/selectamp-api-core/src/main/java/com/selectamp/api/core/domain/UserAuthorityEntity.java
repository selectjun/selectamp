package com.selectamp.api.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthorityEntity {

    /**
     * 회원 아이디(PK, FK)
     */
    private String userId;

    /**
     * 권한코드명(FK)
     */
    private String authorityName;

}
