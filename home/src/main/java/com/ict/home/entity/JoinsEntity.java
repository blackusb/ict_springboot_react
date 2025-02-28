package com.ict.home.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

// vo : value object, dto
/*
    @Entity : 데이터베이스와 연결된 객체를 Entity로 지정하는 어노테이션이다.
              Entity로 만들어야 Repository에서 Entity를 가지고 쉽게 쿼리문을 사용할 수 있도록 해준다.
*/
@Entity //이걸 적어야 테이블 생성됨
@Data //getter, setter, toString, equals
@NoArgsConstructor
@AllArgsConstructor
@Table(name="JOINS_ENTITY")
public class JoinsEntity {
    @Id //primary key에 해당하는 컬럼 지정. 꼭 있어야함
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto increment 설정하는 어노테이션
    @Column(name="JOINS_ID")
    private int id; //일련번호
    @Column(nullable = false, length = 15, unique = true)
    private String userid;
    @Column(nullable = false, length = 15)
    private String userpwd;
    @Column(nullable = false, length = 18)
    private String username;
    @Column(length = 15)
    private String tel;
    private String email;

    @UpdateTimestamp
    @Column(columnDefinition = "DATETIME default now()")
    private String writedate; //회원가입일
}
