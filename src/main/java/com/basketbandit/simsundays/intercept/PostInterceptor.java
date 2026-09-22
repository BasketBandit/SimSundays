package com.basketbandit.simsundays.intercept;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class PostInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        // If "Authorization" is null, doesn't start with "Bearer: ", or isn't a valid token.
        return request.getHeader("Authorization") != null
                && request.getHeader("Authorization").startsWith("Bearer: ")
                && request.getHeader("Authorization").substring(8).equals("itsmemario");
    }
}