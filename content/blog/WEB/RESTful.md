도대체 RESTful 이란 뭔가요???



# REST API

>  **REST(Representational State Transfer)** 란, World Wide Web과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식이다. 
>
> REST 원리를 따르는 시스템을 **RESTful**이라고 지칭한다. (위키백과)



`아키텍처`란 말이 굉장히 애매모호하게 다가왔는데, 쉽게 생각해서 `구조`, `방식` 의 개념으로 이해하면 될 것 같다.  일단 ___웹의 장점을 최대한 살릴 수 있는 구조 ,방식, 스타일___ 이라고 이해한 후 좀더 자세히 살펴보자.



REST의 구성요소는 다음과 같다.

### ✅ **자원(Resource)** 

- URI (Uniform Resource Indentifier) 로 표현된다.

### ✅ 행위(Method)

- 자원에 대한 행위는 HTTP 프로토콜의 Method를 그대로 사용한다. [(참고: HTTP 프로토콜 - 위키백과)](https://ko.wikipedia.org/wiki/HTTP#%EC%9A%94%EC%B2%AD_%EB%A9%94%EC%8B%9C%EC%A7%80)
  - GET
  - POST
  - PUT
  - DELETE

### ✅ 표현(Representation of Resource)

- 서버와 클라이언트가 데이터를 주고받는 형태.
- json, xml, text, rss 등이 있으며, 최근에는 주로 ⭐JSON⭐ 형태를 사용한다.



어떤 API가 아래와 같은 제한 조건을 충족할 때 RESTful하다고 간주될 수 있다.

1. 클라이언트 - 서버 구조 
   - Resource를 가지고 있는 쪽이 서버, Resource를 요청하는 쪽이 클라이언트에 해당한다.
   - 요청은 HTTP를 통해 관리된다.

2. 무상태(Stateless)
   - 각 요청 간 클라이언트 정보가 서버에 저장되지 않는다. 각 요청은 서로 연결되어 있지 않다.

3. 캐시 처리 가능(Cacheable)

4. 자기기술적 (Self-Descriptiveness)

   - Rest API는 요청 메세지만 보고도 이를 쉽게 이해할 수 있는 자체 표현 구조로 되어있다.

   - 예를 들어, 아래와 같은 JSON 형태의 메시지는 `http://localhost:8080/board`로 제목, 내용을 전달하고 있으며, board라는 데이터를 추가(POST)하는 요청임을 파악할 수 있다.

     ```
     HTTP POST, http://localhost:8080/board
     
     {
     	"board":{
     		"title":"제목",
     		"content":"내용"
     	}
     }
     ```

     

4. 계층 구조(Layered System) 

   - 

   - 클라이언트는 대상 서버에 직접 연결되었는지, 또는 중간 서버를 통해 연결되었는지를 알 수 없다. 중간 서버는 [로드 밸런싱](https://ko.wikipedia.org/wiki/로드_밸런싱) 기능이나 [공유 캐시](https://ko.wikipedia.org/w/index.php?title=공유_캐시&action=edit&redlink=1) 기능을 제공함으로써 시스템 규모 확장성을 향상시키는 데 유용하다.

- Code on demand (optional) - 자바 애플릿이나 자바스크립트의 제공을 통해 서버가 클라이언트가 실행시킬 수 있는 로직을 전송하여 기능을 확장시킬 수 있다.   ??????
- 자원의 식별 : 요청 내에 기술된 개별 자원(Resource)를 식별할 수 있다.
  -  예를 들어, 웹 기반 REST 시스템에서는 **URI** 가 그 역할을 한다. 

- 메시지를 통한 리소스의 조작 :
  - 클라이언트가 어떤 자원을 지칭하는 메시지와 특정 메타데이터만 가지고 있다면 이것으로 서버 상의 해당 자원을 변경·삭제할 수 있는 충분한 정보를 가지고 있는 것이다.



 HTTP 통신에서 어떤 자원에 대한 CRUD 요청을 Resource와 Method로 표현하여 특정한 형태로 전달하는 방식







### REST API 설계 규칙

