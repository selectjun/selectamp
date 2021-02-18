package com.selectamp.api.core.util;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValidationProvider {

    public Map<String, Object> valid(Errors errors) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("data", errors.getFieldError().getField());
        error.put("message", errors.getFieldError().getDefaultMessage());
        return error;
    }

}
