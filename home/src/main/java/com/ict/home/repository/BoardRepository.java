package com.ict.home.repository;

import com.ict.home.entity.BoardEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {


    List<BoardEntity> findAllByOrderByIdDesc(PageRequest pageRequest);
}
