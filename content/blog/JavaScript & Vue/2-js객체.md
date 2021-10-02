---
title: '[JavaScript] 자바스크립트 객체'
date: 2021-09-14 01:08:71
category: 'JavaScript & Vue'
thumbnail: { thumbnailSrc }
draft: false
---



## 1) 객체 모델

### (1) 브라우저 객체 모델(BOM, Browswer Object Model)

: 웹 브라우저와 관련된 모든 객체 (웹브라우저가 제공하는 기능)

- `Window` 객체 : BOM의 최상위 객체. 
  - 하나의 브라우저가 열릴때마다 하나의 window 객체가 생성된다. 
  - 자바스크립트에서 선언한 전역변수는 모두 window 객체 안에 등록된다. 
  - 코딩할 때는 굳이 표기하지 않고 생략한다.
- window 객체 하위에 존재하는 여러 객체들
  - `location` : url 주소와 관련
  - `navigator` : 브라우저에 대한 정보
  - `history` : 앞뒤 페이지 이동정보를 기록
  - `screen` : 사용자 화면
  - `document` : 브라우저에 표시된 HTML 문서
  - ... 등등

![SPLessons](https://cdn.splessons.com/wp-content/uploads/2016/03/javascript-bom-01-splessons-1.png)

[이미지 출처] https://www.splessons.com/lesson/javascript-bom/   

   

### (2) 문서 객체 모델(DOM, Document Object Model)

- 브라우저 객체 모델(BOM, Browser Object Model)의 일부이다.

- HTML, XML 문서에 접근하기 위한 인터페이스이다.

- 브라우저 렌더링 엔진은 HTML 문서를 로드한 후 `파싱`하여 브라우저가 이해할 수 있는 구조로 구성하여 메모리에 적재하는데, 이렇게 파싱된 결과가 **`DOM`**이다. 부모-자식 관계가 있는 트리 구조로 구성되기 때문에 **`DOM Tree`**라고 한다.
- 자바스크립트를 통해 DOM을 동적으로 변경할 수 있다.

![문서 객체 모델 - 위키백과, 우리 모두의 백과사전](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)

[이미지 출처] [위키백과](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%84%9C_%EA%B0%9D%EC%B2%B4_%EB%AA%A8%EB%8D%B8)





> 💡 참고 : 웹문서 브라우저 렌더링
>
> 1. 브라우저가 HTML 문서를 로드하고 데이터를 파싱한다.
> 2. HTML을 파싱한 결과로 DOM Tree를 생성한다.
> 3. 파싱하는 중 CSS파일 링크를 만나면 CSS파일을 요청해서 받아온다.
> 4. CSS 파일을 읽어서 CSSOM (Css Object Model)을 생성한다.
> 5. Attachment : DOM Tree와 CSSOM을 사용하여 Render Tree를 만든다.
> 6. Layout: 각 노드들의 위치와 크기를 계산해서 Render Tree를 화면상에 배치한다.
> 7. Paint: 계산이 완료된 렌더 트리를 실제로 화면에 그린다.
> 8. Reflow, Repaint : 특정 액션/이벤트에 따라 HTML 요소가 변화하면 Layout을 다시 그리고(Reflow), 화면에 다시 그려준다(Repaint)

​		   



### 🌳 DOM Tree

Dom Tree는 4종류의 요소(노드)로 구성된다.

- `문서 노드(Document Node)`
  - 최상위에 존재하는 노드
- `요소 노드(Element Node)`
  - HTML 요소 (div, input 등의 태그)
  - 중첩에 의해 부모자식 관계를 가진다
- `속성 노드(Attribute Node)`
  - HTML 요소의 속성
  - 해당 요소의 **자식**이 아니라 **일부**로 표현된다. 해당 요소를 찾아 접근한다.
- `텍스트 노드(Text Node)`
  - HTML 요소의 텍스트



### 📝 DOM 메서드

한 개의 요소 선택

- `document.getElementById(id)` : id 속성값으로 한 개의 노드 선택
- `document.querySelector(cssSelector)` : 

여러 개의 요소 선택

- `document.getElementsByClassName(class)` : 해당 클래스에 속한 요소를 모두 선택
- `document.getElementsByName(name)` : 해당 name 속성을 가진 요소를 모두 선택
- `document.getElementsByTagName(태그명)` : 해당 태그인 요소를 모두 선택

요소 생성

- `document.createTextNode(텍스트)` : 해당 텍스트로 text노드 요소 생성
- `document.write(텍스트)` : 문서에 텍스트 출력

노드 간 관계를 통한 접근

- `요소.parentNode` : 요소의 부모 노드 반환
- `요소.childNodes` : 요소의 자식 노드 리스트 반환
- `요소.firstChild` / `요소.lastChild` : 요소의 첫번째 / 마지막 자식 노드 반환
- `요소.nextSibling` / `요소.previousSibling` : 요소의 다음 / 이전 형제 노드 반환





## 2) 자바스크립트 객체

#### ✅ JavaScript  표준 내장 객체

- 기초 객체 : Object, Function, Boolean, Symbol ...
- 오류 객체 : Error, ...
- 숫자 및 날짜 : Number, Math, Date ... 
- 문자열 : String ...
- 인덱스 콜렉션 : Array ...
- 키 콜렉션 : Map, Set, ...
- ⭐**JSON** (아래에서 자세히!)

#### ✅ 사용자가 직접 구성해서 생성

- **객체 리터럴(Object literal)**

```javascript
/* 객체 리터럴 생성하기 */
let obj = {    
    name: 'bori',    // 변수(=property) 포함 가능
    age: 6,
    info: function(){   // 메서드 포함 가능
        return name;
    }
}
console.log(obj);  // {name: 'bori', age: 6, info: ƒ}
console.log(typeof(obj)); // object
console.log(obj.info());  // bori


/* 새로운 property 추가 및 값 대입, 삭제 가능 */
obj.address = 'seoul';
console.log(obj.address);  // seoul

delete obj.address;
console.log(obj.address);  // undefined
```



### 💎  JSON (JavaScript Object Notation)

- 자바스크립트의 객체 표기법으로부터 파생
- 경량 데이터 교환 형식으로, 서버와 클라이언트간 데이터 전송에 가장 인기있는 데이터 포맷
- 형식
  - JSON 데이터는 `데이터이름`과 `값`의 key, value 쌍으로 이루어짐 
  - 각 데이터들은 쉼표로 나열
  - 데이터이름(key값)은 반드시 `" "`(큰따옴표) 안에 있어야 함

```javascript
let v1 = {"name":"보리", "age": 6};
console.log(v1.name);  // 보리

let v2 = '{"name":"보리", "age": 6}';
console.log(v2.name);  // undefined (v2는 그냥 문자열이므로)
console.log(JSON.parse(v2).name); // JSON 형태의 문자열은 JSON.parse() 함수를 통해 JSON 데이터로 파싱 가능

let v3 = "{'name':'보리', 'age': 6}"; 
console.log(JSON.parse(v3).name); // Uncaught SyntaxError: Unexpected token ' in JSON
// key값이 단일따옴표로 되어 있는 경우 파싱 불가
```









참고한 사이트

https://goddaehee.tistory.com/237

