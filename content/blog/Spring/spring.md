# Spring?

framework



특징

- 경량 애플리케이션 컨테이너임 (web container가 따로 필요없단 말인가)
- Dependency Injection (DI, 의존 객체 주입) 지원

- Aspect Oriented Programming (AOP) 지원 - 공통 기능의 코드, 중복 코드를 직접 코딩 안하고 설정만으로 조립하는것??? 상속 관계조차 필요없다
- Plane Old Java Object (POJO) 지원 - pojo: 순수 자바 코드. 즉 일반 자바 클래스에다가 스프링을 붙일수있다

- 트랜잭션 처리를 위한 일관된 방법 제공
- 영속성 관련된 다양한 API 지원



Spring 컨테이너 기능

- 빈 생성  / 스프링 빈: DTO를 말하는 것이 아니라 스프링이 관리하는 `모든 객체`



Bean

- class
- name
- scope
- constructor arguments
- properties



DI

객체 사이의 의존 관계가 객체 자신이 아닌 외부 조립기( xml 설정파일?? )에 의해 정의

의존성? = 참조





