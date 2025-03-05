package com.ict.home.controller;

import com.ict.home.entity.BoardEntity;
import com.ict.home.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService service;

    //글 등록
    @PostMapping("/boardWriteOk")
    public String boardWriteOk(@RequestBody BoardEntity entity){
        //System.out.println(entity);
        BoardEntity result = service.boardInsert(entity);
        //System.out.println(result);
        if(result==null || result.getId()==0){
            //등록실패
            return "cancel";
        }else{
            //등록성공
            return "ok";
        }
    }

    //레코드 선택
    @GetMapping("/boardList")
    public List<BoardEntity> boardList(@PageableDefault(sort="id", direction = Sort.Direction.DESC) Pageable pageable){
        List<BoardEntity> list= service.boardPageSelect();
        return list;
    }

}
