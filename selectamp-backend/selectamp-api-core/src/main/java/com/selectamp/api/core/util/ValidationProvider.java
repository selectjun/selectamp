package com.selectamp.api.core.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValidationProvider {

    /**
     * 유효성 객체 => 응답 객체로 변환
     * @param errors    유효성 객체
     * @return          응답 객체
     */
    public Map<String, Object> valid(Errors errors) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("data", errors.getFieldError().getField());
        error.put("message", errors.getFieldError().getDefaultMessage());
        return error;
    }

}
