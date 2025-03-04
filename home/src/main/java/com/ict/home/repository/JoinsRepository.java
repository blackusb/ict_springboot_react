package com.ict.home.repository;

import com.ict.home.entity.JoinsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

//                                                       entity, primary로 설정되어 있는 id의 데이터형
public interface JoinsRepository extends JpaRepository<JoinsEntity, Integer> {
    //쿼리메소드 생성, 사용
    JoinsEntity findByUseridAndUserpwd(String userid, String userpwd);


    JoinsEntity findByUserid(String userid);
}
