package com.selectamp.api.core.util.data;

import org.springframework.stereotype.Component;

@Component
public class CustomString {

    public static String toShortWords(String target, int length) {
        return target.substring(0, length) + "...";
    }

}
