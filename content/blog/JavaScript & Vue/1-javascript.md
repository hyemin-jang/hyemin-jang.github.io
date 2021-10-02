---
title: '[JavaScript] 자바스크립트 기초'
date: 2021-09-13 01:08:71
category: 'JavaScript & Vue'
thumbnail: { thumbnailSrc }
draft: false
---



# 자바스크립트란?

- **웹브라우저에 의해 해석되고 실행**되는 스크립트 언어
- 웹문서를 동적으로 꾸밀때 사용됨
- HTML 문서 속에 `<script>`라는 태그를 사용해 기술







## 1) 변수 

### (1) 변수 선언 키워드

- `var` 
  
  - 전역변수(script 태그내) / 로컬변수(함수 내) 선언 가능
  - `재선언`, `재할당` 가능
  - var 키워드는 생략 가능
  
  ```javascript
  var name = "bori";
  var name = "ritae";
  console.log(name);  // ritae 
  ```
  
  
  
- `let` 
  - 선언된 중괄호 내부에서만 사용 가능
  - 재선언 불가, `재할당`만 가능
  
  ```javascript
  let name = "bori";
  let name = "ritae";
  console.log(name);   // Uncaught SyntaxError: Identifier 'name' has already been declared
  ```
  
  ```javascript
  let name = "bori";
  name = "ritae";
  console.log(name);   // ritae
  ```
  
  
  
- `const` 
  
  - 선언된 중괄호 내부에서만 사용 가능
  - **재선언 불가, 재할당 불가 ➡ 상수 선언**
  
  ```javascript
  const name = "bori";  // 반드시 선언과 초기화를 동시에 해야 한다
  name = "ritae";
  console.log(name);  // Uncaught TypeError: Assignment to constant variable.
  ```
  
  
  
  

### (2) 변수의 scope

- 전역변수 

  - 전역에서 선언된 변수
  - script 태그 내 어디서든지 참조 가능

  ```javascript
  var a = 1;  // 전역변수 a 선언 및 값 할당
  
  if (true){
      var a = 5;  // 지역에서 a라는 변수 재선언 및 값 할당
  }
  
  console.log(a);  // 5 
  ```

  

- 지역변수

  - 함수 내, 코드블록(if, for, while, try/catch 등) 내에서 선언된 변수
  - 함수 또는 블록 하위의 지역 스코프에서만 참조 가능

  ```javascript
  let a = 1;  // 전역변수 a 선언 및 값 할당
  
  if (true){
      let a = 5;  // 지역변수 a 선언 및 값 할당
  }
  
  console.log(a);  // 1 (전역변수 a 호출)
  ```

  



### (3) 변수 호이스팅

💎 **호이스팅 (Hoisting)**

: 스코프 내에 있는 선언들을 모두 끌어올려서 스코프 유효 범위의 최상단에 선언하는 것

> 💡 자바스크립트에서 변수의 생성 과정
>
> 1. 선언(Declaration) : 스코프와 변수 객체가 생성되고, 스코프가 변수 객체를 참조한다
> 2. 초기화(Initialization) : 변수 객체 값을 위한 공간을 메모리에 할당. 이 때 할당되는 값은 `undefined`이다.
> 3. 할당(Assignment) : 변수 객체에 값을 할당  



- `var`

  - 선언과 동시에 초기화됨 : `undefined` 할당

  ```javascript
  console.log(name);  // undefined  (var 키워드로 선언한 변수가 호이스팅 되어서 출력)
  var name = "bori";
  ```

  

- `let`  

  - 선언 단계와 초기화 단계가 분리되어 진행
  - 초기화 단계가 진행되지 않았을 때, 해당 변수에 접근하려고 하면 참조 에러 발생 
  - 변수가 선언만 되고 초기화되지 않았다면  `Temporary Dead Zone`에 들어가게 된다.

  ```javascript
  console.log(name);  // ReferenceError: Cannot access 'name' before initialization  (let 키워드로 선언한 변수가 호이스팅 되었으나 참조할 메모리가 없음)
  let name = "bori";
  ```

  





# 

## 2) 함수 

### ✅ 함수 선언식

일반적인 프로그래밍 언어에서의 함수 선언과 같음

`function 함수명(파라미터) { 구현로직 }`

```javascript
// 선언
function getMyName(name){
	alert(name);
}

// 호출
getMyName("hyem");
```





### ✅ 함수 표현식

**변수에 함수 코드를 할당**하는 대신 함수명을 사용하지 않음 - 변수명을 함수명처럼 사용

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

⚡ 함수선언식은 호이스팅이 일어나지만, 함수표현식은 호이스팅이 발생하지 않는다!!

```javascript
f1();  
f2();  // Uncaught TypeError: f2 is not a function

function f1(){
    console.log("hello");
}

var f2 = function(){
    console.log("world");
}


/* 호이스팅에 따른 자바스크립트 실행 순서

var f2;  
function f1(){
	console.log("hello");
}

f1();
f2();

f2 = function(){
	console.log("world");
}
*/

```



### ✅ 즉시실행함수

```javascript
(function myFunc(){
    console.log("이 함수는 호출 없이 즉시 실행됩니다")
}());
```



### ✅ 화살표함수

```javascript
// 선언
let sum = (v1, v2) => v1+v2;

// 호출
sum(10, 20);
```



### ✅ 콜백함수

함수를 명시적으로 호출하지 않고, **특정 시점(사용자 action 발생 시점 = `event`)에 자동 호출**

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





## 3) 반복문

 



## 4) 자바스크립트 Array 함수

### map

filter

reduce





createelement

appendchild

















