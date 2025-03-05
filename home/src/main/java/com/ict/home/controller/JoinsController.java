package com.ict.home.controller;

import com.ict.home.entity.JoinsEntity;
import com.ict.home.service.JoinsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController //뷰가 없는 모델을 리턴하는 컨트롤러
@RequestMapping("/joins")
@RequiredArgsConstructor
public class JoinsController {
    //@Autowired    //@Inject
    //final 멤버변수로 선언된 객체는 class에 @RequiredArgsConstructor를 기술하면 객체가 생성된다.
    private final JoinsService service;

    //리액트에서 요청한 정보를 request하여 db 추가 후 결과를 리턴한다.
    @PostMapping("/formOk")
    public ResponseEntity<String> formOk(@RequestBody JoinsEntity entityVO){
        System.out.println(entityVO.toString());

        JoinsEntity result = service.createJoins(entityVO);
        //System.out.println("insert 후");
        //System.out.println(result.toString());
        if(result!=null && result.getId()>0){ //회원등록
            return ResponseEntity.ok("ok");
        }else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    //로그인
    @PostMapping("/loginOk")
    public JoinsEntity loginOk(@RequestBody JoinsEntity entityVO){
        System.out.println(entityVO.toString());
        JoinsEntity result = service.readJoins(entityVO);
        System.out.println(result);
        //조회정보가 있으면 JoinsEntity에 담아주고,
        //         없으면 null이 돌아온다.
        return result;
    }

    //회원정보 선택
    @PostMapping("/joinsEdit")
    public JoinsEntity joinsEdit(@RequestBody JoinsEntity entityVO){
        return service.joinsSelect(entityVO);
    }

    //회원정보 수정(DB Update)
    @PostMapping("/editOk")
    public String joinsEditOk(@RequestBody JoinsEntity entityVO){
        System.out.println(entityVO);
        
        //비밀번호가 맞는지 확인.
        //DB의 회원정보 선택
        JoinsEntity checkEntity = service.joinsSelect(entityVO);
        if(entityVO.getUserpwd().equals(checkEntity.getUserpwd())){
            //비밀번호 일치 : 수정 진행
            JoinsEntity result = service.createJoins(entityVO); //update문이 있어서 가져다 씀.
            if(result==null){ //업데이트 실패시
                return "updateFail";
            }else{ //업데이트 성공시
                return "updateOk";
            }
        }else{
            //비밀번호 불일치 : 수정 중단
            return "pwdFail";
        }
    }
}
