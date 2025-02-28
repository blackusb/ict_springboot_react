package com.ict.home.controller;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RestController
public class HomeController {
    private static final Logger log = LoggerFactory.getLogger(HomeController.class);

    @GetMapping("/")
    public ModelAndView home(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index"); //index는 뷰페이지명이고 templates/index.html이 된다.

        return mav;
    }

    //리액트 요청을 받아 문자열을 보내는 매핑 처리
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/reactTest")
    public String reactTest(@RequestParam("msg") String msg){
        log.info("리액트에게 받은 문자 : {}", msg);
        return "스프링부트에서 리액트에게 보낸 문자열";
    }
}
