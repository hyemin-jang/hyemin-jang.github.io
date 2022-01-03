# 1. 뷰(Vue)?

웹페이지 화면을 개발하기 위한 오픈소스 자바스크립트 프레임워크

- 쉽고 유연한 방식의 데이터 바인딩과 재사용할 수 있는 컴포넌트 제공

- `가상 DOM`을 사용하기 때문에 실행 성능, 속도를 향상시킴



## 1) 뷰의 구성

- **View**
  - HTML과 CSS로 구성된 화면
  - `{{ }}`와 같은 템플릿 표현식으로 HTML DOM에 데이터를 렌더링
- **ViewModel**
  - View와 Model을 연결하는 Vue 객체
- **Model**
  - 일반적으로 JSON 형태로 데이터 표현



### 💎 MVVM pattern 

동작순서

1. 사용자
2. ㅇ
3. ㅇ
4. ㅇ
5. ㅇ
6. 화면에 출력





## 2) 뷰의 특징

### (1) 가상 DOM

DOM의 복사본을 생성해서 사용

시뮬레이션 원리

실제 변경된 부분만 DOM에 변화를 줌 -> HTML화면 갱신







### (2) 양방향 데이터 바인딩

데이터 바인딩

:화면에 보이는 데이터와 브라우저 메모리에 있는 데이터를 일치시키는 기법

- 양방향 데이터 바인딩 : 데이터의 변화를 감지해 템플릿과 결합하여 화면을 갱신 / 화면에서의 입력에 따라 데이터를 즉각 갱신 `v-model`
  - 코드의 양 줄여줌
  - 유지보수 용이
- 



## 3) 뷰 개발환경 구축

1. Node.js 설치
2. Vue 개발자 도구 - 크롬 확장 플러그인
3. Vue.js 설치
   - CDN 방식: \<script> tag에 추가
   - 
4. ㅇㅇ





## 4) Vue instance

- Vue 어플리케이션 시작점 (자바의 main()과 흡사)
- Vue 생성자로 생성

```javascript
new Vue({
    el:
    template:
    data:
    methods:
    created:
});
```

### (1) Vue instance의 속성들

| property | 특징                                    |
| -------- | --------------------------------------- |
| el       | Vue로 만든 화면이 적용될 지점           |
| template | 화면에 표시될 HTML/CSS 등의 요소를 정의 |
| data     | instance가 사용할 데이터                |
| methods  |                                         |
| created  | instance의 라이프사이클을 커스터마이징  |



```javascript
```



### (2) Vue instance 라이프사이클

1. instance 생성
2. template과 가상 DOM 생성
3. 이벤트 loop
4. 인스턴스 소멸



### (3) Vue instance 유효범위



## 5) Vue 템플릿

: Vue instance에서 정의한 데이터 및 로직들을 사용자가 브라우저에서 볼 수 있는 형태의 HTML로 변환해 주는 속성

### (1) 자바스크립트 템플릿 : `{{ }}` 





### (2) Vue 디렉티브

Vue가 View에 데이터를 표현하는 등의 용도로 사용되는 특별한 속성

- HTML 태그 내에 `v-접두사` 형태로 사용



#### ✅ 텍스트 표현 : v-text, v-html, v-once









### Computed 속성

