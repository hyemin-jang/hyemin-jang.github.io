

DOM? BOM? 



목차

-변수

-함수

-브라우저 내장 함수

​	- alert(), 

-DOM (Document Object Model)

 - documentElementById()

-js의 객체

-Ajax

-View



# 1. 자바스크립트란?

- **웹브라우저에 의해 해석되고 실행**되는 스크립트 언어
- 웹문서를 동적으로 꾸밀때 사용됨
- HTML 문서 속에 `<script>`라는 태그를 사용해 기술







# 2. 변수

(1) 변수 선언 키워드

- var : 전역변수(script 태그내) 선언 / 로컬변수(함수 내) 선언 - 함수 내 자유롭게 사용가능
- let : 선언된 중괄호 내부에서만 사용 가능
- const : 선언된 중괄호 내부에서만 사용 가능 / 값 재할당 불가(상수)
- 키워드 없이 :  함수 내에 선언하더라도 전역변수로 선언 - script 태그 내부에서 자유롭게 사용 가능



(2) 변수 scope

- 함수 내에서 선언된 로컬 변수 -> 선언된 범위 내에서만 호출 가능



# 2. 함수

## 1) 함수 생성 방식

### (1) 함수 선언식

일반적인 프로그래밍 언어에서의 함수 선언과 같음

`function 함수명() { 구현로직 }`

```javascript
// 선언
function getMyName(name){
	alert(name);
}

// 호출
getMyName("hyem");
```





함수 선언식은 호이스팅에 영향을 받는다.

: 코드를 구현한 위치와 관계없이 호이스팅에 따라 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어올려진다.

> 💡 호이스팅(Hoisting)
>
> ㅇㄹㅇㄹㅇㅁ



### (2) 함수 표현식

#### ✅ 익명함수

변수에 함수 코드를 저장하는 대신 함수명을 사용하지 않음 - 변수명을 함수명처럼 사용

`var/let/const 함수명 = function() { 구현로직 }`

```javascript
// 선언
let myName = function(name){
	alert(name);
}

// 호출
myName("hyem");
```

⚡ 함수 표현식에서 함수 이름을 사용하더라도 그 이름은 외부 코드에서 접근 불가능

```javascript
let add = function sum(x,y){
    return x+y;
}

console.log(add(3,4));  // 7
// console.log(sum(3,4));   => 접근불가
```



## 2) 다양한 함수들

#### ✅ 즉시실행함수

```javascript
(function myFunc(){
    console.log("이 함수는 호출 없이 즉시 실행됩니다")
}());
```



#### ✅ 화살표함수

```javascript
// 선언
let sum = (v1, v2) => v1+v2;

// 호출
sum(10, 20);
```



#### ✅ 콜백함수

함수를 명시적으로 호출하지 않고, **특정 시점(사용자 action 발생 시점 = event)에 자동 호출**

```javascript
// id="btn1"인 버튼에 콜백함수 적용
document.getElementById("btn1").addEventListener('click', function(){
    alert("hello")
});  

// 같은 코드
function myFunc(){
    alert("hello");
}
document.getElementById("btn1").addEventListener('click', myFunc);  
```



# 

# 3. 객체

## 1) 객체

#### ✅ 전역객체 

- window : 자바스크립트에서 갖는 최상위 전역 객체

- window의 하위 객체
  - document
  - history
  - location 
  - screen

- 전역객체는 코딩시에 생략 가능
- `var` 키워드로 선언된 변수는 전역객체의 property로 등록됨
- 전역함수
  - alert()
  - 



#### ✅ JavaScript  표준 내장 객체

- 기초 객체 : Object, Function, Boolean, Symbol ...
- 오류 객체 : Error, ...
- 숫자 및 날짜 : Number, Math, Date ... 
- 문자열 : String ...
- 인덱스 콜렉션 : Array ...
- 키 콜렉션 : Map, Set, ...
- ⭐**JSON**

#### ✅ 사용자가 직접 구성해서 생성

- 객체 리터럴

객체 리터럴 생성하기

```javascript
let obj1 = {
    // 변수(=property) : 값
    name: 'bori',
    age: 6,
    info: function(){
        console.log(name);
    }
}
console.log(obj1);
console.log(typeof(obj1)); // object
console.log(obj1.info());  // undefined  왜지?? => 함수 내부에서 해당 객체의 변수값 활용시에는 this(객체 자체를 의미하는 키워드) 필수

let obj2 = {
    name2: 'ritae',
    age: 6,
    info: function(){
        console.log(this.name2);
    }
}
console.log(obj2.info()); // ritae 나옴

let obj3 = {
    name3: 'hyem',
    age: 6,
    info: function(){
        console.log(this.name3);
        return 'borimom'
    }
}
console.log(obj3.info()); // hyem, return값으로 borimom 출력

// 새로운 property 추가 및 값 대입, 삭제 가능
obj3.address = 'seoul';
console.log(obj3.address);  // seoul

delete obj3.address;
console.log(obj3.address);  // undefined
```



## 2) BOM DOM

### (1) BOM



### (2) DOM

**문서 객체 모델(Document Object Model)**

브라우저 객체 모델(BOM, Browser Object Model)의 일부이다.

HTML, XML 문서의 각 항목을 계층으로 표현하여 생성, 변형, 삭제할 수 있도록 하는 프로그래밍 인터페이스이다.

![문서 객체 모델 - 위키백과, 우리 모두의 백과사전](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)

[이미지 출처] [위키백과](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%84%9C_%EA%B0%9D%EC%B2%B4_%EB%AA%A8%EB%8D%B8)



- 내가 작성한 HTML 코드가 브라우저에 의해 파싱되면 DOM이 된다
- 브라우저 개발자 툴에서 보이는 바로 그것이 DOM이다!



## 3) JSON



json 주용도:

서버와 클라이언트간에 전송되는 가장 인기있는 데이터 포맷

왜냐면  key value로 명확하게 활용 가능하기 때문

csv, tsv, txt 등등 포맷보다 훨씬 데이터 구분 명확, 활용 수월





# 4. 자바스크립트 Array 함수

### map

filter

reduce





createelement

appendchild

















