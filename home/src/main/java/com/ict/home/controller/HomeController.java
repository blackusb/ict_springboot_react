package com.ict.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
    @GetMapping("/")
    public ModelAndView home(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index"); //index는 뷰페이지명이고 templates/index.html이 된다.

        return mav;
    }
}
