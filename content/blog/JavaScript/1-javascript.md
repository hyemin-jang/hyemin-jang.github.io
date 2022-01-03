---
title: '[JavaScript] 자바스크립트 기초'
date: 2021-09-13 01:08:71
category: 'JavaScript'
thumbnail: { thumbnailSrc }
draft: false
---



## 자바스크립트란?

- **웹브라우저에 의해 해석되고 실행**되는 스크립트 언어
- 웹문서를 동적으로 꾸밀때 사용됨
- HTML 문서 속에 `<script>`라는 태그를 사용해 기술







## 변수 선언

💡 **자바스크립트에서 변수의 생성 과정**

1. 선언(Declaration) : 스코프와 변수 객체가 생성되고, 스코프가 변수 객체를 참조한다
2. 초기화(Initialization) : 변수 객체 값을 위한 공간을 메모리에 할당. **이 때 할당되는 값은 `undefined`이다.**
3. 할당(Assignment) : 변수 객체에 값을 할당  

<br>



### 1) `var`

- 전역변수(script 태그내) / 로컬변수(함수 내) 선언 가능 (function scope)
- 재선언, 재할당 가능
- var 키워드는 생략 가능

```javascript
var name = "bori";
var name = "ritae";

console.log(name);  // ritae 
```

⚡ var 키워드로 블록 내에서 변수를 선언하더라도 블록 범위를 무시하고 **전역 변수 / 함수 지역 변수로 선언된다**.

```javascript
var name = "bori";

if (true){
    var name = "kiwi";  // 지역에서 name이라는 변수 재선언 및 값 할당
}

console.log(name);  // kiwi
```



### 2) `let` 

- 선언된 중괄호 내부에서만 사용 가능 (block scope)
- 재선언 불가, **재할당**만 가능

```javascript
let name = "bori";
let name = "ritae";

console.log(name);   // Uncaught SyntaxError: Identifier 'name' has already been declared (재선언 불가)
```

⚡ let 키워드는 함수 또는 코드블록(if, for, while, try/catch 등) 내에서만 유효한 **지역변수를 선언**한다.

```javascript
var name = "bori";

if (true){
    let name = "kiwi";  // 지역변수 a 선언 및 값 할당
}

console.log(a);  // bori (전역변수 name 호출)
```







### 3) `const` 

- 선언된 중괄호 내부에서만 사용 가능
- **재선언 불가, 재할당 불가 ➡ 상수 선언**

```javascript
const name = "bori";  // 반드시 선언과 초기화를 동시에 해야 한다
name = "ritae";

console.log(name);  // Uncaught TypeError: Assignment to constant variable.
```



<br>









## 함수 선언

### 함수 선언식

일반적인 프로그래밍 언어에서의 함수 선언과 같음

`function 함수명(파라미터) { 구현로직 }`

```javascript
// 선언
function getMyName(name){
	alert(name);
}

// 호출
getMyName("bori");
```





### 함수 표현식

**변수에 함수 코드를 할당**하는 대신 함수명을 사용하지 않음 - 변수명을 함수명처럼 사용

`var/let/const 함수명 = function() { 구현로직 }`

```javascript
// 선언
let myName = function(name){
	alert(name);
}

// 호출
myName("bori");
```

⚡ 함수 표현식에서 함수 이름을 사용하더라도 그 이름은 외부 코드에서 접근 불가능

```javascript
let add = function sum(x,y){
    return x+y;
}

console.log(add(3,4));  // 7
// console.log(sum(3,4));   => 접근불가
```



### 즉시실행함수

```javascript
(function myFunc(){
    console.log("이 함수는 호출 없이 즉시 실행됩니다")
}());
```



### 화살표함수

```javascript
// 선언
let sum = (v1, v2) => v1+v2;

// 호출
sum(10, 20);
```



### 콜백함수

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





<br>

## 호이스팅(Hoisting)

 : 스코프 내에 있는 **선언**들을 모두 끌어올려서 스코프 유효 범위의 최상단에 선언하는 것

- `var 변수 선언`과 `함수선언문`에서만 호이스팅이 일어난다.

  - 변수 선언이 함수 선언보다 더 위로 호이스팅된다

- let / const 변수 선언과 함수표현식에서는 호이스팅이 발생하지 않는다.

  

<br>

⚡ var 키워드로 변수를 선언하면 **선언과 동시에 초기화**(메모리에 공간 할당)된다 : `undefined` 할당

```javascript
console.log(name);  // undefined  (var 키워드로 선언한 변수가 호이스팅 되어서 출력)

var name = "bori";
```

⚡ let 키워드로 선언한 변수는 **선언 단계와 초기화 단계가 분리**되어 진행된다.

- 초기화 단계가 진행되지 않았을 때, 해당 변수에 접근하려고 하면 참조 에러가 발생한다. 
- 변수가 선언만 되고 초기화되지 않았다면  `Temporary Dead Zone`에 들어가게 된다.

```javascript
console.log(name);  // ReferenceError: Cannot access 'name' before initialization (let 키워드로 선언한 변수가 호이스팅 되었으나 참조할 메모리가 없음)

let name = "bori";
```

⚡ 함수선언식은 호이스팅이 일어나지만, 함수표현식은 호이스팅이 발생하지 않는다

```javascript
f1();  
f2();  // Uncaught TypeError: f2 is not a function

function f1(){
    console.log("hello");
}

var f2 = function(){
    console.log("world");
}


/* 호이스팅에 따라 위 코드를 자바스크립트가 실행하는 순서

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

⚡ 함수표현식에서는 **선언과 할당의 분리**가 발생한다. 그러므로 선언과 호출 순서에 따라서 정상적으로 함수가 실행되지 않을 수 있다.

- 함수표현식의 선언이 호출보다 위에 있는 경우 - 정상 출력

```javascript
function f1(){
    var f2 = function(){  // 함수표현식 선언
        return "bori";
    }
    
    var result = f2();  // 함수표현식 호출
    console.log("name is " + result);
}

f1();  // name is bori


/* 호이스팅에 따라 위 코드를 자바스크립트가 실행하는 순서

function f1(){
	var f2;
	var result;
	
	f2 = function(){
		return "bori";
	}
	result = f2();
	console.log("name is " + result);
}

f1();

*/
```

- 함수표현식이 `var` 변수에 할당되었고, 선언이 호출보다 아래에 있는 경우 - `TypeError`

```javascript
function f1() {
	var result = f2(); // 함수표현식 호출
    console.log("name is " + result);

	var f2 = function () { // 함수표현식 선언		
		return "bori";
	};
}

f1();  // Uncaught TypeError: f2 is not a function


/* 호이스팅에 따라 위 코드를 자바스크립트가 실행하는 순서

function f1(){
	var result;  
	var f2; // 함수표현식이 할당된 변수값 "선언" - undefined 상태
	
	result = f2();  // 에러발생
	console.log("name is " + result);
	
	f2 = function () { 
		return "bori";
	};
}

f1();  // TypeError - f2가 선언되긴 했지만 undefined가 할당된 상태이므로 아직 함수로 인식되고 있지 않음

*/
```



- 함수표현식이 `let / const` 변수에 할당되었고, 선언이 호출보다 아래에 있는 경우 - `ReferenceError`

```javascript
function f1() {
	let result = f2(); // 함수표현식 호출
    console.log("name is " + result);

	let f2 = function () { // 함수표현식 선언		
		return "bori";
	};
}

f1();  // Uncaught ReferenceError: Cannot access 'f2' before initialization


/* 호이스팅에 따라 위 코드를 자바스크립트가 실행하는 순서

function f1(){
	let result = f2();  // 에러발생 (함수선언식이 left 변수에 할당됐으므로 호이스팅 X, 아직 f2가 선언되지 않은 상태)
	console.log("name is " + result);

	let f2 = function () { 
		return "bori";
	};
}

f1();  // ReferenceError - f2가 아직 선언되지 않음

*/
```



💡 코드의 가독성과 유지보수를 위해 가급적 호이스팅이 발생하지 않는 `let`, `const` 사용하도록 하자!



<br>

## 자바스크립트 Array 함수

### map

`array.map(callbackfn(currentValue, index, arr), thisValue)`

주어진 배열의 값들을 오름차순으로 접근해 callbackfn을 통해 새로운 값을 정의하고 신규 배열을 만들어 반환한다.

- callbackfn (Required) : 배열의 각 요소에 적용될 함수
- currentValue (Required) : 처리할 현재 요소
- index (Optional) : 처리할 현재 요소의 인덱스값
- arr (Optional) :  map 함수를 호출한 배열
- thisValue (Optional) :  Default값은 `undefined`. callbackfn을 실행할 때 this로 사용되는 값

```javascript
var arr = [1,2,3,4];

var newArr = arr.map((v) => v*2);

console.log(newArr);  // [2,4,6,8]
```





### filter





### reduce

`array.reduce(callbackfn(accumulator, currentValue, currentIndex, arr), initialValue)`

- callbackfn (Required) : 배열의 각 요소에 적용될 함수
- accumulator (Required) : 콜백함수의 반환값 누적 (콜백의 이전 반환값 / 콜백의 첫번째 호출이면서 initailValue를 제공한 경우에는 initialValue의 값)
- currentValue (Required) : 처리할 현재 요소
- currentIndex (Optional) : 처리할 현재 요소의 인덱스값 (initialValue를 제공한 경우 0 / 아닌 경우 1부터 시작)
- arr (Optional) : reduce 함수를 호출한 배열
- initialValue (Optional) : 콜백함수의 최초 호출에서 첫번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫번째 요소를 사용. 빈 배열에서 초기값 없이 reduce 함수를 사용하면 오류 발생



✅ 모든 원소 더하기

```javascript
var arr = [1,2,3,4];

var newArr = arr.reduce((acc, cur) => acc + cur);

console.log(newArr);  // 10
```

✅ 모든 원소 더하기 (초기값 제공)

```javascript
var arr = [1,2,3,4];

var newArr = arr.reduce((acc, cur) => acc + cur, 5);  // initialValue 제공

console.log(newArr);  // 15
```

✅ 중첩 배열 펼치기

```javascript
var arr = [[0, 1], [2, 3], [4, 5]]

var flattend = arr.reduce((acc, cur) => acc.concat(cur), []);

console.log(flattned);  // [0, 1, 2, 3, 4, 5]
```

✅ 배열의 요소 개수 세기

```javascript
var names = ['bori', 'ritae', 'bori', 'kiwi', 'ritae', 'bori'];

var countedNames = names.reduce((all, name) => {
    if (name in all){
        all[name]++;
    } else {
        all[name] = 1;
    }
    return all;
}, {});

console.log(countedNames); // {'bori' : 3, 'ritae' : 2, 'kiwi' : 1}
```

✅ 중복 요소 제거

```javascript
var arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];

var newArr = arr.sort().reduce((acc, cur) => {
    const length = acc.length;
    if (length === 0 || acc[length-1] !== cur){
        acc.push(cur);
    }
    return acc;
}, []);

console.log(newArr);  // [1,2,3,4,5]
```





<br>

-------------------

[참고한 자료]

- 호이스팅  https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html

- reduce 함수  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce













