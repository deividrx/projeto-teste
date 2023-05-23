package br.comvarejonline.projetoinicial.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private InMemoryUserDetailsManager usersManager;

    @GetMapping
    public UserDetails getUserInfo(Principal principal) {
        return usersManager.loadUserByUsername(principal.getName());
    }
}
