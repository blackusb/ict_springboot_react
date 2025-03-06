package com.ict.home.controller;

import com.ict.home.entity.BoardEntity;
import com.ict.home.entity.PagingVO;
import com.ict.home.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //레코드 한개 선택
    @GetMapping("/boardList")
    public Map boardList(PagingVO pVO, @PageableDefault(sort="id", direction = Sort.Direction.DESC) Pageable pageable){
        //총레코드 수
        pVO.setTotalRecord(service.totalRecord(pVO));

        System.out.println(pVO.toString());

        List<BoardEntity> list = service.boardPageSelect(pVO);

        //pVO, list 두개 다 return 해야해서 map 사용. map이나 array 사용.
        Map map = new HashMap();
        map.put("pVO", pVO);
        map.put("list", list);

        return map;
    }

    //글내용 보기            : /board/boardView/${id} => /board/boardView/23
    @GetMapping("/boardView/{id}")
    public BoardEntity boardView(@PathVariable("id") int id){
        return service.boardDetail(id).get();
    }

    //글 삭제
    @GetMapping("/boardDel/{id}")
    public int boardDel(@PathVariable("id") int id){
        service.boardDelete(id);
        int cnt = service.boardSearch(id);
        System.out.println(cnt);

        return cnt;
    }
}
