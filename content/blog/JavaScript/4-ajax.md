---
title: '[JavaScript] Ajax'
date: 2021-09-17 01:08:71
category: 'TIL - Playdata'
thumbnail: { thumbnailSrc }
draft: false
---





## Ajax?

**비동기식 자바스크립트와 XML (Asynchronous JavaScript and XML)**

자바스크립트를 통해서 `서버`와 `브라우저`가 `비동기 방식`으로 데이터를 교환할 수 있는 기법



> 💡 비동기 방식?
>
> - 웹 페이지 전체를 다시 로딩하지 않고 데이터를 불러오는 방식
> - 요청을 보낸 후 응답을 기다리면서 멈추어 있는 것이 아니라 프로그램이 계속 작동 중
> - 필요한 부분의 데이터만 불러올 수 있고, 그 외의 부분은 다른 작업을 할 수 있으므로 효율적
>
> ![img](https://t1.daumcdn.net/cfile/tistory/995FCE405C5EC51A30)
>
>  좌: 동기 방식 /  우: 비동기 방식 (request, response가 발생해도 process는 계속 진행 중)
>
> [이미지 출처]  https://jieun0113.tistory.com/73





## XMLHttpRequest

**자바스크립트의 비동기 통신 API**

- 전체 페이지의 새로고침 없이도 URL로부터 데이터를 받아올 수 있는 객체 (XML뿐 아니라 모든 종류의 데이터를 받아올 수 있음)
- 최신 브라우저들은 XMLHttpRequest 객체를 내장하고 있다.



​	  

### 💎 XMLHttpRequest의 속성들

- `onreadystatechange` : readyState 속성이 변경되면 실행될 함수 정의

- `readyState` : 요청의 상태를 체크 가능한 속성

  - 0 (UNSENT) : XMLHttpRequest 객체가 생성됨

  - 1 (OPENED) : open() 메소드가 성공적으로 실행됨
  - 2 (HEADERS_RECEIVED) : 모든 요청에 대한 응답이 도착함
  - 3 (LOADING) : 요청한 데이터를 처리 중임
  - 4 (DONE) : 요청한 데이터의 처리가 완료되어 응답할 준비 완료

- `status`: 요청의 응답 상태를 나타냄

  - 200 : 응답 성공
  - 403 : Forbidden. 서버가 허용하지 않는 페이지
  - 404 : Not Fund. 서버에 문서가 존재하지 않음

- `responseText` / `responseXML` : 서버에서 데이터가 응답될 때 해당 데이터(텍스트/XML)를 대입받는 속성

    

<br>

### 1) GET 방식 요청

✅  서버로부터 데이터 받아서 출력하기

<ajaxRes.jsp> 

```jsp
<%@ page language="java" contentType="text/plain; charset=UTF-8"
    pageEncoding="UTF-8"%>
{"name":"보리", "age":6}
```



\<ajaxReq.html>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <button onclick="loadDoc()">클릭</button>
    <div id="div1"></div>
    
    <script>
    	function loadDoc() {     
            // ajax 요청 객체 생성
            const xhttp = new XMLHttpRequest();  

            // 요청~응답까지의 검증 및 응답 데이터 처리하기 위한 사전 설정
            xhttp.onreadystatechange = function() { // onreadystatechange 이벤트 핸들러 설정
                if (this.readyState == 4 && this.status == 200) {  // 응답 완료 && 정상응답이면
                    let data = this.responseText;  // 응답받을 데이터
                    document.getElementById("div1").innerHTML = "이름은 " + JSON.parse(data).name; 
                }
            };
            
            xhttp.open("GET", "ajaxRes.jsp");   // 요청방법 및 요청할 주소 설정
            xhttp.send();  // 요청 전송 -> 실제 요청 수행
        }
    </script>
</body>
</html>
```

<br>

✅  서버로 데이터 전송하고, 응답 받아서 출력하기

<ajaxRes.jsp>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>  
저는 이름은 ${param.name}이고 나이는 ${param.age}살인 귀여운 고양이애오
```

EL태그 `${param}` (`request.getParameter("key값")`과 동일)을 사용해 request에 저장되어 전송되는 데이터를 출력할 수 있다.

\<ajaxReq.html> 

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 비동기 방식으로 개발할거기 때문에 form일 필요가 없다 -->
	<input type="text" id="name" value="보리"><br>
	<input type="text" id="age" value="6"><br>
	<div id="dataView"></div>
	
	<script>
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				let data = this.responseText;
				console.log(data);
				dataView.innerText = data;  
			}
		}
		// 요청방식 지정, 요청할 주소 지정(쿼리스트링으로 데이터 전달)
		xhr.open("GET", "ajaxRes.jsp?name="+ document.getElementById("name").value +"&age="+ document.getElementById("age").value);		
		xhr.send();		
	</script>
</body>
</html>
```





<br>

### 2) POST 방식 요청

- POST 방식으로 데이터를 전송할 때는 반드시 HTTP 헤더를 설정하는 메소드를 써야 한다.
- `setRequestHeader(헤더명, 헤더의 값)` 형식
- `application/x-www-form-urlencoded`은 웹브라우저가 폼 태그를 이용해서 입력받은 데이터를 POST 방식으로 전송할 때 사용하는 표준 MIME type이다.

<br>

<ajaxRes.jsp> 

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>  
저는 이름은 ${param.name}이고 나이는 ${param.age}살인 귀여운 고양이애오
```



\<ajaxReq.html> 

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>	
	<input type="text" id="name" value="보리"><br>
	<input type="text" id="age" value="6"><br>
	<div id="dataView"></div>
	
	<script>
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				let data = this.responseText;
				console.log(data);
				dataView.innerText = data;  
			}
		}		
		xhr.open("POST", "ajaxRes.jsp");  // POST방식은 url에 데이터 노출시키지 않음
        
        // post방식으로 서버에 데이터 전송시 필수 header 설정 
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
        
		xhr.send("name="+ document.getElementById("name").value +"&age="+ document.getElementById("age").value);
	</script>
</body>
</html>
```





## MVC 패턴에서 Ajax 사용 예제

: 오라클 DB에 저장된 Dept 테이블에서 모든 부서 정보를 가져와서 브라우저에 출력해보자

​	  

<req.html> : 브라우저에서 사용자 요청 받고, 서버의 응답 결과를 출력하는 화면

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>deptReq.html</title>
</head>
<body>
	<button id="btn1">모든 부서 정보 요청</button>
	<div id="dataView"></div>
	
	<script>
		btn1.addEventListener("click", deptReq);
		
		function deptReq(){
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200){
					let data = this.responseText;					
					dataView.innerHTML = data;  // 응답 데이터를 받으면 div 영역에 출력하겠다는 설정
				}
			}
			xhr.open("GET", "dept");  // GET방식으로 컨트롤러로 요청 전송하겠다는 설정
			xhr.send();		
		}
	</script>
</body>
</html>
```



<DeptController.java>

```java
package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.DeptDAO;
import dto.DeptDTO;

@WebServlet("/dept")
public class DeptController extends HttpServlet {
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ArrayList<DeptDTO> all = DeptDAO.selectAll();
		if(all.size() != 0) {
			request.setAttribute("deptAll", all);
			request.getRequestDispatcher("res.jsp").forward(request, response);  // request에 응답할 정보 담아서 jsp파일로 전송
		}else {
			request.getRequestDispatcher("error.jsp").forward(request, response);		
		}
	}
	
}
```



<DeptDTO.java>  : DB로부터 가져온 데이터를 전달하기 위한 DTO클래스

```java
package dto;

public class DeptDTO {
	private int deptno;		
	private String dname; 	
	private String loc; 	
	
	public DeptDTO() {}
	public DeptDTO(int deptno, String dname, String loc) {
		this.deptno = deptno;
		this.dname = dname;
		this.loc = loc;
	}

	public int getDeptno() {
		return deptno;
	}
	public void setDeptno(int deptno) {
		this.deptno = deptno;
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	
	@Override
	public String toString() {
		return "DeptDTO [deptno=" + deptno + ", dname=" + dname + ", loc=" + loc + "]";
	}
}
```



<DeptDAO.java>  : DB로부터 CRUD 수행하는 메소드 개발하는 클래스

```java
package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import dto.DeptDTO;
import util.DBUtil;

public class DeptDAO {	
	public static ArrayList<DeptDTO> selectAll() {
		Connection con = null;
		Statement stmt = null;
		ResultSet rset = null;
		
		ArrayList<DeptDTO> al = null;
        
    // DB로부터 데이터 SELECT 
		try {
			con = DBUtil.getConnection();
			stmt = con.createStatement();
			rset = stmt.executeQuery("select * from dept");
			
			al = new ArrayList<>();
			
			while (rset.next()) {
				al.add(new DeptDTO(rset.getInt("deptno"), rset.getString("dname"), rset.getString("loc")) );
			}
		} catch (SQLException e) {
			e.printStackTrace();
        
    // 자원 반환
		} finally {
			DBUtil.close(con, stmt, rset); 
		}
        
		return al;
	}
}
```



<DBUtil.java>

```java
package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBUtil {
	// 메모리상에 oracle driver를 로딩하는 설정
	static {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}	
	
  // DB 연결, 커넥션 생성
	public static Connection getConnection() throws SQLException {
		return DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:xe", "SCOTT", "TIGER");
	}
	
  // 자원 반환하는 메소드
	public static void close(Connection con, Statement stmt, ResultSet rset) {
		try {
			if(rset != null) {
				rset.close();
				rset = null;
			}
			if(stmt != null) {
				stmt.close();
				stmt = null;
			}
			if(con != null) {
				con.close();
				con = null;
			}			
		} catch (SQLException e) {
			e.printStackTrace();
		} 
	}
	
}
```



<res.jsp> : 서버로부터 응답받은 데이터를 브라우저가 읽을 수 있는 형태로 변환 ➡ HTML 파일에서 출력

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="dao.DeptDAO, dto.DeptDTO, java.util.ArrayList" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<table>
	<thead>
		<th>부서번호</th><th>부서명</th><th>지역</th>
	</thead>
	<c:forEach items="${deptAll}" var="dept">
		<tr><td>${dept.deptno}</td><td>${dept.dname}</td><td>${dept.loc}</td></tr>
	</c:forEach>
</table>
```



이렇게 Ajax 기술을 사용하면 <req.html>파일을 다시 로딩하지 않고 데이터를 불러올 수 있다.
