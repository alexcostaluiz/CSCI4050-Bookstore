package com.csci4050.bookstore.events;

import java.io.IOException;
import java.util.Collection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException, ServletException {

    String redirectUrl = null;

    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    if (authorities.contains(new SimpleGrantedAuthority("ADMIN"))) {
      redirectUrl = "/admin";
    } else {
      redirectUrl = "/";
    }
    new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
  }
}
