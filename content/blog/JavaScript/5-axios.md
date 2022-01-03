---
title: '[JavaScript] Axios'
date: 2021-09-25 01:08:71
category: 'TIL - Playdata'
thumbnail: { thumbnailSrc }
draft: false

---





## Axios?

브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리

- 브라우저에선 XMLHttpRequests를, Node.js에선 HTTP 요청 생성
- Promis API 지원

> 💡 Promise ?
>
> 비동기 처리를 유연하게 처리하기 위한 자바스크립트 API.
>
> Pending - Fulfilled - Rejected

- 요청과 응답을 Intercept 한다.
- 데이터를 JSON 형태로 자동 변환시켜준다.
- XSRF로부터 보호하기 위한 클라이언트 측 지원



### Axios 실행 환경 설정

Axios를 설치하기 위한 여러 방법이 있지만 두 가지만 정리하자면, 

1. npm을 통한 설치

```
$ npm install axios
```



> ⚡ Node.js와 npm이 설치되어 있어야 한다 ➡ [Node.js 설치](https://nodejs.org/ko/)
>
> - `Node.js` : 서버에서 자바스크립트를 동작할 수 있도록 하는 오픈 소스 서버 환경 
> - `npm` : Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소. 패키지 설치 및 관리를 위한 CLI(Command Line Interface) 제공
>   - npm은 Node.js보다 자주 업데이트 되므로 최신 버전으로 업데이트 필요할 수 있음 
>   - `npm install -g npm@latest` 명령어를 통해 최신 버전으로 업그레이드



2. CDN 사용

> 💡 CDN (Contents Delivery Network)
>
> 지리적으로 분산된 여러 개의 서버. 
>
> 웹 요소 (텍스트, 그래픽, 스크립트), 다운로드 가능한 요소 (미디어 파일, 소프트웨어, 문서), 애플리케이션 (전자상거래, 포털), 실시간 미디어.. 등등 상당수의 컨텐츠를 CDN으로 전달할 수 있다.
>
> 사용자의 물리적 위치와 가까운 서버에서 콘텐츠를 전송함으로써 병목 현상을 해결하고 전송 속도를 높인다.



head 태그 내에 아래 코드 추가

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

또는

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```





## Axios 사용하기

✅ **GET 방식**으로 서버(response.jsp)에 요청을 보내고 응답을 받아보자

<response.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
저는 이름은 ${param.name}이고 나이는 ${param.age}살인 귀여운 고앵이애오
```

<axiostest.html>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>axios test</title>

<!-- axios 라이브러리 include -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script> 
    
</head>
<body>
    <button onclick="getData()">클릭</button>
    <div id="dataView"></div>
    
    <script>
        function getData(){
            axios({
                method: "get",  // 요청을 보낼 방식 설정
                url: "response.jsp",  // 요청을 보낼 주소
                params: {  // 요청을 통해 전송할 파라미터 데이터
                    name: "bori",
                    age: 6
                }
            }).then(resData => {  // then() : 요청 성공시 자동으로 실행되는 함수
                // 화살표함수의 파라미터 resData: 응답된 객체 / resData.data : 응답된 실제 데이터를 담고있는 속성
                document.getElementById("dataView").innerText = resData.data;  // 응답된 데이터를 div 태그 내에 출력하겠다
            }).catch(error => {  // catch() : 요청 실패시 자동으로 실행되는 함수
                console.log(error);
            });
        }    	
    </script>
</body>
</html>
```

<결과 출력>



<br>

#### 💎 단축된 axios 메소드

- GET : 데이터 조회  `axios.get(url [, config])`
- POST : 데이터 등록 및 전송 `axios.post(url, data [, config])`
- PUT : 데이터 수정 `axios.put(url, data [, config])`
- DELETE : 데이터 삭제 `axios.delete(url [, config])`



<br>

✅ **get()**으로 서버(response.jsp)에서 JSON 데이터 받아오기

<response.jsp>

```html
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
{"name":"보리", "age":6}
```

<axiostest.html>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>post</title>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>   
</head>
<body>	
	<button onclick="reqResAjax()">클릭</button><br>
    <div id="dataView"></div>
	
	<script>
		// button click시에 비동기 요청 및 JSON 포멧의 데이터를 응답받기
		function reqResAjax(){
			axios({
				method: "get",
				url: "response.jsp"				
			}).then(resData => {				
				document.getElementById("dataView").value = resData.data.name;  // 화면에 "보리" 출력된다
				/* JSON.parse() 없이도 axios가 알아서 JSON 객체로 응답해준다!! */
			}).catch(error => {
				alert("error");
			});
		}
    </script>
</body>
</html>
	
```

<br>

✅ **get()**으로 서버(response.jsp)에 파라미터 데이터 전송하기 - `query string` 사용

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>axios test</title>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>     
</head>
<body>
    <button onclick="getData()">클릭</button>
    <div id="dataView"></div>
    
    <script>
        function getData(){
            axios.get("response.jsp?name=bori&age=6")  // 쿼리스트링으로 데이터 전송
            .then(resData => {   
                document.getElementById("dataView").innerText = resData.data;
            }).catch(error => {
                console.log(error);
            });             
        }    	
    </script>
</body>
</html>
```

<br>

✅  **get()**으로 서버(response.jsp)에 파라미터 데이터 전송하기 - `params` 속성 사용

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>axios test</title>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>     
</head>
<body>
    <button onclick="getData()">클릭</button>
    <div id="dataView"></div>
    
    <script>
        function getData(){
            axios.get("response.jsp?", {
				params: {  // params 속성으로 데이터 전송
					name: "bori",
					age: 6
				}
            }).then(resData => {
                document.getElementById("dataView").innerText = resData.data;
            }).catch(error => {
                console.log(error);
            });           
        }    	
    </script>
</body>
</html>
```

<br>

✅  **POST방식**으로 서버에 데이터 전송

<axiostest.html>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>axios test</title>    
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>     
</head>
<body>
    <button onclick="getData()">클릭</button>
    <div id="dataView"></div>
    
    <script>        
        function getData(){
            axios.post("response.jsp", null, {
            	params: {				
					name: "bori",
					age: 6		
            	}
            }).then(resData => {            	
                document.getElementById("dataView").innerText = resData.data;
            }).catch(error => {
                console.log(error);
            });           
        }     
    </script>
</body>
</html>
```

⚡ 주의: post 함수의 인자는 `(url, data [, config])` 이기 때문에 파라미터 데이터를 전송하고 싶으면 두 번째 인자를 `null`로 주어야 한다.

