---
title: '[Spring] Spring MVC'
date: 2021-10-05 20:08:71
category: 'Spring'
thumbnail: { thumbnailSrc }
draft: false

---





## 1) 구성







프론트 Controller 패턴 아키텍처

- 클라이언트가 보낸 요청을 받아서 공통적인 작업 먼저 수행

- 적절한 세부 컨트롤러로 위임

- 예외가 발생했을 경우 프론트컨트롤러가 일관된 방식으로 처리



프론트 컨트롤러는 스프링에서 지원해준다

= DispatcherServlet

![Spring Mvc Architecture Flow Online Shop, UP TO 66% OFF](https://www.onlinetutorialspoint.com/wp-content/uploads/2015/04/Spring-Web-MVC-Framework-Flow.png)

실행 프로세스

1. DispatcherServlet이 HTTP 요청을 받음
   1. D ~가 서브 컨트롤러로 요청 위임
2. 컨트롤러의 모델 생성과 정보를 등록하고 클라이언트의 요청 결과 리턴
3. DispatcherServlet의 모델로 뷰 생성
4. ㄹㄹ



`Filter`

`Interceptor`



## 2) 개발 구조

메이븐 프로젝트로 변환 후 pom.xml에 dependency  추가

```xml
<properties>
    <java.version>1.8</java.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <spring-framework.version>4.3.30.RELEASE</spring-framework.version>
</properties>
	
<dependencies>
    <!-- Spring MVC, 즉 Spring 기반의 웹 개발에 필요한 필수 library -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>${spring-framework.version}</version>
    </dependency>

    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>2.2.2</version>
    </dependency>
    
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.7.3</version>
    </dependency>
   
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.8</version>
    </dependency>
</dependencies>
```



<web.xml> : front controller 등록시에는 정통 url매핑 방식 사용

참고 - servlet 컨트롤러에서 `@WebServlet` 애노테이션과 같은 기능

```xml
<web-app>
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>  <!-- 매핑할 url주소 -->
    </servlet-mapping>
</web-app>
```

`http://ip:port번호/project명/` 라는 url주소로 dispatcher라는 이름의 서블릿에 접근하게 된다.

- `<load-on-startup>1</load-on-startup>` : 메모리에 로딩시에 가장 먼저 생성하라는 우선순위를 부여하는 설정. 즉 클라이언트 접속 여부와 무관하게 front controller는 가정 먼저 생성해 놓으라는 의미.





**WEB-INF 하단(web.xml과 같은 경로)**에 Spring Bean Configuration 파일 생성

파일명은 `dispatcher-servlet.xml` : **dispatcher**이라는 이름은 web.xml에서 설정한 서블릿 이름과 같아야 한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.3.xsd">

	<!-- html파일이 dispatcher servlet을 거치지 않고도 직접 호출할 수 있게 하는 설정 -->
	<mvc:annotation-driven />  
	<mvc:default-servlet-handler/>
	
	<!-- 서브컨트롤러를 스프링 빈으로 등록 -->
	<context:component-scan base-package="subcontroller"></context:component-scan>
</beans>
```





<index.html>

```html
```





<HelloWorld.java>  : 서브 컨트롤러

```java
package subcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

// 순수 자바 클래스를 스프링이 알아서 서블릿처럼 작동시킴
@Controller
public class HelloWorld {
	@RequestMapping(value="one", method=RequestMethod.GET)  // 이 컨트롤러를 one이라는 url로 매핑하겠다
	public ModelAndView m1() {  // ModelAndView : 데이터와 최종 뷰에 대한 정보를 갖는 객체
		ModelAndView mv = new ModelAndView();
		
		// view.jsp 지정
		mv.setViewName("view");
		
		//
		mv.addObject("name", "playdata");
		mv.addObject("msg", "한글");
		
		return mv;
	}
}
```



> - `@Controller` : spring 기반의 사용자 정의 http 처리 클래스
> - `@RequestMapping` : 클라이언트가 url상에 요청하는 이름/방식과 매핑하는 설정



​	  

이제 View를 만들어볼 텐데, 기존에는 html, jsp 파일은 WebContent 폴더 하단에 만들었다. 그러나 스프링에서는 WebContent 하단의 `WEB-INF` 디렉토리에 jsp파일을 개발할 수 있게 됨으로써 **보안이 강화**될 수 있다.

<WEB-INF/views/view.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
${name}, ${msg}
</body>
</html>
```



페이지 이동 방식

- 1) `redirect` 방식 : 
  - `return "redirect:이동할url" `
  - view는 WebContent 디렉토리 내에 개발해야 한다. **WebContent/WEB-INF 내 개발 불가**
- 2) forward 방식:
  - prefix에 지정해준다면 inf내 가능

-------------





## 3) 실습 예제

### (1) 화면 이동하기

#### ✅ redirect 방식으로 화면 이동

```java
@Controller
public class Step01Controller {
	
	@RequestMapping(value = "hello1", method = RequestMethod.GET)  // method 생략하면 디폴트는 GET방식임
	public String m1() {		
		return "redirect:page1.jsp";  		
	}
}
```

메소드 반환타입이 String이다. 리턴값은 `"redirect:이동할url"`이다.

이동 후 url: 



#### ✅ forward 방식으로 화면 이동

##### ⚡ 1. 반환타입이 `ModelAndView`  - 무조건 forward방식

```java
@Controller
public class Step01Controller {
	
    @RequestMapping(value = "hello2") 
	public ModelAndView m2() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("page2");  
		mv.addObject("data1", "첫번째 데이터");
		mv.addObject("data2", "두번째 데이터");
		
		return mv;  		
	}
}
```

메소드 반환타입이 `ModelAndView` 객체이다.

> ModelAndView 의 기능
>
> - View 이름 지정 : `setViewName()`
> - 데이터를 request 객체에 저장 : `addObject()`



`dispatcher-servlet.xml` 파일에서 prefix와 sufffix를 설정한 대로, setViewName()을 통해 지정한 View 이름에 붙어서 jsp파일을 `WebContent/WEB-INF` 디렉토리 내 개발이 가능하다.   -  보안 강화

이동 후 url:  

​	  

<WebContent/WEB-INF/views/page2.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
${requestScope.data1} 
${requestScope.data2}
</body>
</html>
```

forward 방식은 화면 이동시에도 request/response 객체가 유지된다. 따라서 jsp파일에서 requestScope에서 데이터를 꺼내 사용할 수 있다.



##### ⚡ 2-1. 반환타입이 `String` - 

```java
@Controller
public class Step01Controller {
	
    @RequestMapping(value = "hello3") 
	public String m3() {
				
		return "page3";		
	}
}
```

String 타입으로 반환시 return 문장에 redirect 표현 없이 view 이름만 리턴하면 기본으로 **forward방식**으로 이동한다.

이동 후 url: 



##### ⚡ 2-2. 반환타입이 `String` -  거치지 않고

forward:/



### (2)  데이터 전송하기

#### ✅ redirect 방식으로 이동시에 데이터 전송하기(파라미터 데이터 전송) : `RedirectAttributes`

```java
@Controller
public class Step01Controller {
	
    @RequestMapping(value="hello4")  
	public String m4(RedirectAttributes attr) {		
		attr.addAttribute("key", "value입니다");  // 쿼리스트링(파라미터 데이터) 담기
		
		return "redirect:page4.jsp";  		
	}
}
```

**메소드 파라미터**로 `RedirectAttributes`를 받는다.

`addAttribute()` 를 통해 파라미터로 전달할 데이터를 key, value 구조로 담는다.

이동 후 url : 

<WebContent/page4.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
${param.key}
</body>
</html>
```

RedirectAttributes 객체에 담은 데이터를 jsp파일에서  `${param.키이름}` 를 통해 사용할 수 있다.



-------------------

### (2) 전송받은 데이터 jsp파일에서 사용하기

아래 예제들은 index.html에서 보내는 요청이 `<a href="hello5?id=bori&age=10">`와 같이 **웹 쿼리스트링으로 사용자가 입력한 데이터가 포함된 경우** 그 데이터를 어떻게 활용할 수 있는지에 대한 예제이다!!



#### ✅ forward 방식으로 화면이동 후 쿼리스트링 및 request에 저장한 데이터 활용 - `ModelAndView` API 사용

```java
@Controller
public class Step01Controller {
	
    @RequestMapping("hello5")
	public ModelAndView m5() {
		ModelAndView mv = new ModelAndView();  
		
        mv.setViewName("page5");  		
		mv.addObject("newData", "서버에서 reqeust에 새로 저장한 데이터입니다");  // 서버에서 request에 새로 저장한 데이터 (=request.setAttribute())
		
        return mv;
	}
}
```

이동 후 url: 

​	  

<WebContent/WEB-INF/views/page5.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
파라미터로 받은 데이터: ${param.id}, ${param.age}<br>  
서버에서 저장한 데이터: ${requestScope.newdata}
</body>
</html>
```

**forward** 방식으로 이동했으므로 request 객체가 그대로 유지된다.

➡ request의 파라미터, setAttribute로 저장된 데이터 모두 jsp 파일에서 활용 가능



#### ✅ forward 방식으로 화면이동 후 쿼리스트링 및 request에 저장한 데이터 활용 - `Model` API 사용  

```java
@Controller
public class Step01Controller {
	
    @RequestMapping("hello6")
	public String m6(Model model) {
		
		model.addAttribute("key", "value입니다");   // request에 데이터 저장		
		
		return "page6";
	}
}
```

**메소드 파라미터**로 `Model`을 받아 Model 인터페이스를 사용할 수 있다.

`addAttribute()`를 통해 클라이언트 View에 전송할 데이터를 key, value 형태로 Model에 담는다.



<WebContent/WEB-INF/views/page5.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
쿼리스트링으로 넘어온 데이터 : ${param.id}-${param.age} <br>
서버에서 Model에 저장한 데이터 : ${requestScope.key} <br>
없는 데이터 : ${requestScope.id} <!-- 출력안됨. 데이터 없음 -->
</body>
</html>
```

**forward** 방식으로 이동했으므로 request 객체가 그대로 유지된다.

➡ request의 파라미터, setAttribute로 저장된 데이터 모두 jsp 파일에서 활용 가능

> 💡 `ModelAndView` vs `Model` 차이점
>
> - Model 인터페이스 사용시에는 메소드 파라미터로 Model을 받아서 사용하고, View 이름을 String 타입으로 반환한다.
> - ModelAndView 클래스 사용시에는 메소드 내부에서 ModelAndView 객체를 생성해 사용하며, `setViewName()` 메소드를 통해 뷰 이름을 지정한다.





#### ✅ 클라이언트가 입력한 데이터로 DTO 객체를 생성해서 활용하는 경우 : `@ModelAttribute`

아래와 같이 멤버변수로 `id`, `age`를 갖는 DTO 클래스가 있을 때,

<src/model.domain/Customer.java>

```java
package model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Customer {
	private String id;
	private int age;
	
}
```



클라이언트 뷰에서 온 요청이  `<a href="hello7?id=bori&age=10">`와 같이, **쿼리스트링의 key들과 DTO클래스의 멤버변수명이 모두 일치할 경우, 메소드에 파라미터 선언만으로 DTO 객체 생성**된다!

DTO 파라미터 앞에 `@ModelAttribute` 애노테이션 붙이면 

?????????????????????

```java
@Controller
public class Step01Controller {
	
    @RequestMapping("hello7")
	public String m7(@ModelAttribute("c") Customer c) {  
        // = request.setAttribute("c", new Customer(파라미터로 들어온 id, 파라미터로 들어온 age))		
		
		return "page7";
	}
    
}
```





### (3) 예외 처리하기

질문

forward는 무조건 web inf로 가나요?  - 아니구나! prefix에 붙여놔서 그렇구나 ^^

handler가 트라이 캐치 대신인가요? 예외처리를 하면 printstacktrace는 어디서찍나요?

model은 뭘까요???
