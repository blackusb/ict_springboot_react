package com.ict.home.service;

import com.ict.home.entity.BoardEntity;
import com.ict.home.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository; //@RequiredArgsConstructor가 new 해준다.

    public BoardEntity boardInsert(BoardEntity entity) {
        return boardRepository.save(entity);
    }

    public List<BoardEntity> boardPageSelect() {
        //select * from board_entity order by join_id desc
        //                                                  페이지번호 : 0,1,2,3..., 한페이지의 레코드수
        return boardRepository.findAllByOrderByIdDesc(PageRequest.of(0,5));
    }
}
