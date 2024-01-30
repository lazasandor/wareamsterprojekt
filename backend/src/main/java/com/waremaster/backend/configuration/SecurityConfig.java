package com.waremaster.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Bean
	public SecurityFilterChain filterchain(HttpSecurity http) throws Exception {
		try {
	        http
	        // ...
	       .httpBasic(httpBasic -> httpBasic.disable())
	       .authorizeHttpRequests((authorizeExchange) -> authorizeExchange               
	             .anyRequest().permitAll())
	       .csrf((csrf) -> csrf.disable());
	    } catch (Exception e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } 
	    return http.build();
	}
	
}
