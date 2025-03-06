package com.ict.home.service;

import com.ict.home.entity.BoardEntity;
import com.ict.home.entity.PagingVO;
import com.ict.home.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository; //@RequiredArgsConstructor가 new 해준다.

    public BoardEntity boardInsert(BoardEntity entity) {
        return boardRepository.save(entity);
    }

    public List<BoardEntity> boardPageSelect(PagingVO pVO) {
        if(pVO.getSearchWord()==null || pVO.getSearchWord().equals("")) {//검색어가 없을 때
            //select * from board_entity order by join_id desc
            //                                                  페이지번호 : 0,1,2,3..., 한페이지의 레코드수
            return boardRepository.findAllByOrderByIdDesc(PageRequest.of(pVO.getNowPage() - 1, pVO.getOnePageRecord()));
        }else {//검색어가 있을 때
            return boardRepository.findAllBySubjectContainingOrderByIdDesc(pVO.getSearchWord(), PageRequest.of(pVO.getNowPage() - 1, pVO.getOnePageRecord()));
        }
    }

    //총레코드수
    public int totalRecord(PagingVO pVO) {
        if (pVO.getSearchWord()==null || pVO.getSearchWord().equals("")) {//검색어가 없을 때
            //select count(id) from board_entity
            return boardRepository.countIdBy();

        }else {//검색어가 있을 때
            //select count(id) from board_entity where subject like '%검색어%'
            return boardRepository.countIdBySubjectContaining(pVO.getSearchWord());
        }
    }

    public Optional<BoardEntity> boardDetail(int id) {
        return boardRepository.findById(id);
    }

    public void boardDelete(int id) {
        //delete from board_entity where id=21
        boardRepository.deleteById(id);
    }

    public int boardSearch(int id) {
        return boardRepository.countById(id);
    }
}
