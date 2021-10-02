# 1. Ajax?

**비동기식 자바스크립트와 XML (Asynchronous JavaScript and XML)**

자바스크립트를 통해서 `서버`와 `브라우저`가 `비동기 방식`으로 데이터를 교환할 수 있는 기법

~~(그러나 현재 데이터 전송은 대부분 xml이 아니라 json을 이용하는건 함정)~~

💡 비동기 방식?

- 웹 페이지 전체를 다시 로딩하지 않고 데이터를 불러오는 방식

- 웹 페이지가 로드된 후에 서버로 request를 보낼 수 있고, response를 받을 수 있다.

  

## 1) XMLHttpRequest

**자바스크립트의 비동기 통신 API**

전체 페이지의 새로고침 없이도 URL로부터 데이터를 받아올 수 있는 객체. (XML뿐 아니라 모든 종류의 데이터를 받아올 수 있음)

✅ XMLHttpRequest의 속성들

- `readyState` : 요청의 상태를 체크 가능한 속성

  - 0 (UNSENT) : XMLHttpRequest 객체가 생성됨

  - 1 (OPENED) : open() 메소드가 성공적으로 실행됨
  - 2 (HEADERS_RECEIVED) : 모든 요청에 대한 응답이 도착함
  - 3 (LOADING) : 요청한 데이터를 처리 중임
  - 4 (DONE) : 요청한 데이터의 처리가 완료되어 응답할 준비 완료

- `status`: 요청의 응답 상태를 나타냄

  - 200 : 응답 성공
  - 404 : 서버에 문서가 존재하지 않음
  - 405

- `responseText` & `responseXML` : 서버에서 데이터가 응답될 때 해당 데이터를 대입받는 속성

  

```javascript
function loadDoc() {     
    // ajax 요청 객체 생성
    const xhttp = new XMLHttpRequest();  

    // 요청~응답까지의 검증 및 응답 데이터 처리하기 위한 사전 설정
    xhttp.onreadystatechange = function() { // onreadystatechange 이벤트 핸들러 설정
        if (this.readyState == 4 && this.status == 200) {  // 응답 완료 && 정상응답이면
            document.getElementById("div1").innerHTML = this.responseText; // 요청한 데이터를 문자열로 반환
        }
    };
    xhttp.open("GET", "ajaxRes.jsp");   // 요청방법 및 요청할 주소 설정
    xhttp.send();  // 요청 전송 -> 실제 요청 수행
}
```

