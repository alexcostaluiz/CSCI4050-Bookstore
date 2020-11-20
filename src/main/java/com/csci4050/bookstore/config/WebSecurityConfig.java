package com.csci4050.bookstore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
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
  private static final SessionRegistry SESSION_REGISTRY = new SessionRegistryImpl();

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http.csrf()
        .disable()
        .authorizeRequests()
        .antMatchers("/profile", "/checkout", "/logout", "/edit/**")
        .authenticated()
        .antMatchers(
            "/admin/**",
            "/books/update",
            "/books/archive",
            "/books/create",
            "/books/unarchive",
            "/promos/update",
            "/promos/delete",
            "/promos/create",
            "/promos/email",
            "/users/**")
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
        .invalidateHttpSession(true)
        .and()
        .sessionManagement()
        .maximumSessions(-1)
        .sessionRegistry(sessionRegistry())
        .expiredUrl("/");
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

  @Bean
  public static SessionRegistry sessionRegistry() {
    return SESSION_REGISTRY;
  }
}
