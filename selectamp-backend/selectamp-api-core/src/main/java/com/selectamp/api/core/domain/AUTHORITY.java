package com.selectamp.api.core.domain;

import lombok.Data;

@Data
public class AUTHORITY {

    /**
     * 권한코드명(PK)
     */
    private String name;

    /**
     * 구분(USER|ADMIN)
     */
    private String kinds;

    /**
     * 권한설명
     */
    private String description;
}
