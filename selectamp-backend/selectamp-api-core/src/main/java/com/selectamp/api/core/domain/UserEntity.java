package com.selectamp.api.core.domain;

import com.selectamp.api.core.util.cryption.Aes256;
import lombok.*;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends TimeEntity {

    /**
     * 아이디
     */
    @NotBlank(message = "아이디를 입력해주세요")
    @Size(min = 4, max = 32, message = "아이디는 4 ~ 32자리로 입력해주세요")
    private String id;

    /**
     * 암호
     */
    @NotBlank(message = "비밀번호를 입력해주세요")
    @Size(max = 256, message = "비밀번호는 256자 이내로 입력해주세요")
    private String password;

    /**
     * 이름
     */
    @NotBlank(message = "이름을 입력해주세요")
    @Size(max = 64, message = "이름은 64자 이내로 입력해주세요")
    private String name;

    /**
     * 이메일
     */
    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$",
             message = "이메일 형식에 맞게 입력해주세요")
    private String email;

    /**
     * 최종_로그인_일시
     */
    private LocalDateTime lastLoginAt;

    /**
     * 암호_최종_수정일시
     */
    private LocalDateTime passwordLastChangeAt;

    /**
     * 로그인_실패_횟수
     */
    @Builder.Default
    private Long loginFailedCount = 0L;

    /**
     * 약관동의여부
     */
    @Builder.Default
    private Boolean isAgree = false;


    /**
     * 암호화
     * @param aes256    AES-256 Cryption Component
     * @return          암호화 객체
     */
    public UserEntity toEncryptionEntity(Aes256 aes256) {
        return UserEntity.builder()
                .id(id)
                .password(password)
                .name(name)
                .email(aes256.encryption(email))
                .lastLoginAt(lastLoginAt)
                .passwordLastChangeAt(passwordLastChangeAt)
                .loginFailedCount(loginFailedCount)
                .isAgree(isAgree)
                .build();
    }

    /**
     * 복호화
     * @param aes256    AES-256 Cryption Component
     * @return          복호화 객체
     */
    public UserEntity toDecryptionEntity(Aes256 aes256) {
        return UserEntity.builder()
                .id(id)
                .password(password)
                .name(name)
                .email(aes256.decryption(email))
                .lastLoginAt(lastLoginAt)
                .passwordLastChangeAt(passwordLastChangeAt)
                .loginFailedCount(loginFailedCount)
                .isAgree(isAgree)
                .build();
    }

}
