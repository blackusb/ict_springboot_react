package com.ict.home.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="BOARD_ENTITY")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name="BOARD_ID") //DB에서의 이름
    private int id;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(columnDefinition = "int default 0")
    private int hit;

    @Column(nullable = false, length = 200)
    private String subject;

    @CreationTimestamp
    @Column(columnDefinition = "DATETIME default now()")
    private String writedate;
    
    //조인
    @ManyToOne //1:N
    @JoinColumn(name="JOINS_ID") //테이블에 생성되는 필드명
    private JoinsEntity joins; //조인된 회원정보를 보관할 변수
}
