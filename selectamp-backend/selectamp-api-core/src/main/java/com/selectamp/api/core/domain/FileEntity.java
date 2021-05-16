package com.selectamp.api.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity extends TimeEntity {

    private Long id;

    @NotBlank(message = "파일 이름을 입력해주세요")
    @Size(min= 1, max = 256, message = "파일 이름은 1 ~ 256자로 입력해주세요")
    private String originalName;

    private String saveName;

    private String userId;

}
