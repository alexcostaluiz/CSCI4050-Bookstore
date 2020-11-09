package com.csci4050.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired UserDetailsService userDetailsService;
  @Autowired AuthenticationFailureHandler failureHandler;
  @Autowired AuthenticationSuccessHandler successHandler;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf()
        .disable()
        .authorizeRequests()
<<<<<<< HEAD
        .antMatchers("/profile", "/checkout", "/logout", "/auth/user", "/auth/changePassword", "/auth/edit_profile", "/auth/saveCard", "/auth/deleteCard", "/auth/updateAddress", "/auth/user")
=======
        .antMatchers("/profile", "/checkout", "/logout")
>>>>>>> master
        .hasAnyAuthority("ADMIN", "USER")
        .antMatchers("/admin", "/admin/manage/books")
        .hasAuthority("ADMIN")
        .antMatchers("/", "/cart", "/b/**")
        .permitAll()
        .and()
        .formLogin()
        .loginPage("/login")
        .failureHandler(failureHandler)
        .successHandler(successHandler)
        .permitAll()
        .and()
        .rememberMe()
        .key("ourKey")
        .rememberMeParameter("remember")
        .and()
        .logout()
        .logoutSuccessUrl("/login")
        .invalidateHttpSession(true);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService);
  }

  @Bean("authenticationManager")
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
