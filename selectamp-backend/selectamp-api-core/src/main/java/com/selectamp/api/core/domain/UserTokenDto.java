package com.selectamp.api.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class    UserTokenDto {

    /**
     * 사용자 ID
     */
    @NotBlank(message = "아이디를 입력해주세요")
    private String id;

    /**
     * 사용자 암호
     */
    @NotBlank(message = "암호를 입력해주세요")
    private String password;

}
