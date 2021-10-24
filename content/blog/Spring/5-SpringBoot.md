# Spring Boot

Spring의 핵심 기능은 수용하지만 많은 '엔터프라이즈' 기능을 제거

자바 기반의 REST(Representational State Transfer) 지향 마이크로서비스 프레임워크 재구성

커맨드 도구와 탐캣 / 제티 같은 내장 서버를 통해 복잡한 설정과 실행 간소화

단위테스트 강화

UTF-8 인코딩을 위한 서블릿 필터 등록되어 있음

정적 자원과 Web Jars에 대한 위치 설정 및 요청 연결 템플릿 엔진 설정 및 기본 View Resolver를 구성하고 있음

JSON / XML을 다룰 수 있는 메시지 변환기 등록되어 있음





- 라이브러리 관리 자동화
- 설정 자동화
- 테스트 환경과 내장 탐캣
- 독립적 실행 - 메인메소드 기반



## 1) 개발 환경 설정

### (1) 프로젝트 생성

new - Spring Starter Project



Spring Boot DevTools: 수정하고 서버 리스타트 안해도되게

Lombok

Spring Web

선택



메인메소드로 실행함에도 불구하고 내부적으로 Tomcat을 구동시키면서 웹을 실행시킨다!!



### (2) 디렉토리 구조

src/







- main 클래스
  - project명+Application.java



## 2) 개발 방식

컨트롤러 개발시 웹페이지 자원 구분을 위한 url 을 사용하게 유도

요청방식도 애노테이션으로 지원

주요 애노테이션

@RestController

@Repository

@Service



### RestController



> **REST(RESTful)?**
>
> REST는 프로토콜이나 표준이 아닌 아키텍처 원칙 세트입니다. API 개발자는 REST를 다양한 방식으로 구현할 수 있습니다.
>
> RESTful API를 통해 요청이 수행될 때 RESTful API는 리소스 상태에 대한 표현을 요청자에게 전송합니다. 이 정보 또는 표현은 HTTP: JSON(Javascript Object Notation), HTML, XLT 또는 일반 텍스트를 통해 몇 가지 형식으로 전송됩니다. JSON은 그 이름에도 불구하고 사용 언어와 상관이 없을 뿐 아니라 인간과 머신이 모두 읽을 수 있기 때문에 가장 널리 사용됩니다. 

@RestController

@GetMapping

@PostMapping



Spring MVC vs Spring Boot RESTful 

@Controller   / @RestController



### REST

웹에 존재하는 모든 자원에 고유한 URI를 부여해 사용하자는 것

하나의 URI는 고유한 리소스와 연결되며 이 리소스는 GET/POST/PUT/DElLETE 등의 HTTP 메소드로 제어하자는 개념

레스트풀이란 레스트 원리를 따르는 시스템을 지칭하는 용어

- GET : 정보 요청. 조회?
- POST : 새로운 정보 저장 / 기존 정보 수정
- PUT : 
- DELETE : 정보 삭제



REST API 규칙

- URI는 정보의 자원을 표시해야 함. 동사?명사?
- 





## 3) Spring Data JPA

Spring Boot에서 JPA를 쉽게 사용할 수 있도록 지원하는 모듈



![JPA, Hibernate, Spring Data JPA의 전반적인 그림](https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png)

[이미지 출처] https://suhwan.dev/2019/02/24/jpa-vs-hibernate-vs-spring-data-jpa/



1. 인터페이스 개발

- 인터페이스 내에 쿼리메소드(=CRUD를 실행하는 메소드) 구현.. 구현이 아니라 뭐라고하지 미완성메소드

- 네이밍 룰
  - find엔티티명By변수명 / findBy변수명
  - 

=> Spring Data JPA가 미완성 메소드를 구현 완성해서 객체화해서 서비스

2. 컨트롤러에서 사용자가 만든 인터페이스를 멤버변수로 선언











----------------------------



# Spring Boot Logging

`LogBack` 프레임워크 사용





----------------------------















# Spring Boot에서 단위테스트



서버 구동 없이 Controller만 독립적으로 테스트 - `MockMvc` 객체

실제 컨테이너가 아닌 

