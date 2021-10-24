# Spring Boot & JUnit



프로젝트명TestApplication.java

: 자동으로 test전용 클래스 생성





가짜 객체 활용

`Mock`

- `perform()` : 가상의 request 처리.

  - 파라미터로 요청방식 메소드를 받음
  - 요청은 ~~ 통해 생성

- `andExpect()` :

  

개발 방식

1. test클래스 내에 테스트하고자 하는 controller와 Mock를 멤버로 선언
2. DI 방식으로 멤버 변수 초기화 ?????????????
3. 

