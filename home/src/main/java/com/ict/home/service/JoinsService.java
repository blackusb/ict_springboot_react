package com.ict.home.service;

import com.ict.home.entity.JoinsEntity;
import com.ict.home.repository.JoinsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinsService {
    private final JoinsRepository repository;
    //회원등록
    public JoinsEntity createJoins(JoinsEntity entityVO){
        //insert into joins_entity(userid, userpwd, username, tel, email) values (?,?,?,?,?);
        //select id, userid, userpwd, username, tel, email, from joins_entity where id=1;
        //entity에 id가 0이면 insert수행
        //        id가 0이 아니면 update문을 수행한다.
        return repository.save(entityVO);
    }
    //로그인
    public JoinsEntity readJoins(JoinsEntity entityVO){
        //select * from joins_entity where userid='goguma' and userpwd='1234';
        return repository.findByUseridAndUserpwd(entityVO.getUserid(), entityVO.getUserpwd());
    }

    //회원선택
    public JoinsEntity joinsSelect(JoinsEntity entityVO){
        return repository.findByUserid(entityVO.getUserid());
    }
}
