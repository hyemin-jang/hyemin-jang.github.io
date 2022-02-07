## Prototype

**원형**이라는 뜻.

객체의 프로토타입(원형)을 가지고 새로운 객체를 생성해가는 프로그래밍 방식.

생성된 객체는 자기 자신의 프로토타입을 갖는다. = 즉 자기자신이 만들어지게 된 원형을 안다.

(자바스크립트는 원래 클래스라는게 없어서 프로토타입을 이용하여 객체의 확장과 재사용, 상속 등을 구현해나갔음. 현재는 자바스크립트도 클래스를 문법적으로 지원함)



```javascript
const fruit = {name:'apple'};

// 객체에 속성 추가
fruit.expiration = '20220101';

// 속성이 있는지 체크
console.log(fruit.hasOwnProperty('expiration'));  // true


```



