package com.selectamp.api.web.config.webSecurity;

import com.selectamp.api.web.config.webSecurity.service.CustomPasswordEncoder;
import com.selectamp.api.web.config.webSecurity.service.JwtAuthenticationFilter;
import com.selectamp.api.web.config.webSecurity.service.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfigure extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    public WebSecurityConfigure(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/user/").permitAll()
                .antMatchers(HttpMethod.POST, "/api/token/**").permitAll()
                .anyRequest().hasAnyRole("USER")
            .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * 제외 항목
     * @param webSecurity
     */
    @Override
    public void configure(WebSecurity webSecurity) {
        webSecurity.ignoring().antMatchers();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new CustomPasswordEncoder();
    }

}
