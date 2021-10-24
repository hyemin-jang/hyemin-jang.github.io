---
title: '[Python] 정규표현식'
date: 2021-10-22 09:10:47
category: 'Python'
thumbnail: { thumbnailSrc }
draft: false
---





# 정규표현식



## 1) 메타문자
원래 그 문자가 가진 뜻이 아닌 특별한 용도로 사용되는 문자

### ✅ 문자클래스 [ ]
:  **`[]` 사이의 문자들과 매치**

- 예) `[abc]` : a, b, c중 한 개의 문자와 매치
- \[ ] 안의 두 문자 사이에 `하이픈(-)` 사용 : 두 문자 사이의 범위
- \[ ] 안에 `^` 메타문자 사용:  **반대(not)**의 의미

| 표기법 | 의미                             | 같은표현       |
| ------ | -------------------------------- | -------------- |
| `\d`   | 숫자와 매치                      | [0-9]          |
| `\D`   | 숫자가 아닌것과 매치             | \[^0-9]        |
| `\s`   | whitespace(공백) 문자와 매치     | [\t\n\r\f\v]   |
| `\S`   | whiltespace 문자가 아닌것과 매치 | \[^\t\n\r\f\v] |
| `\w`   | 문자+숫자와 매치                 | [a-zA-Z0-9]    |
| `\W`   | 문자가 아닌 것과 매치            | \[^a-zA-Z0-9]  |



### ✅ 횟수, 위치 및 그룹

| 표기법  | 의미                                                         | 예제                                 |
| ------- | ------------------------------------------------------------ | ------------------------------------ |
| `*`     | 0회 이상 반복                                                | `ca*t`  : ct, cat, caaaaat, ... 등등 |
| `+`     | 1회 이상 반복                                                | `ca+t`  : cat, caaaaat, ... 등등     |
| `?`     | 0회 또는 1회 (존재하거나 존재하지 않거나)                    | `ca?t` : ct, cat                     |
| `{m}`   | m회 반복                                                     | `ca{3}t`  : caaat                    |
| `{m,n}` | m회부터 n회까지 반복                                         | `ca{2,3}t`  : caat, caaat            |
| `.`     | 줄바꿈 문자를 제외한 모든 문자 (1개의 임의의 문자)           | `c.t`  : cat, cbt, ... 등등          |
| `^`     | ^ 뒤의 문자로 시작됨 **(주의: ^가 [] 안에 쓰이면 not의 의미)** | `^cats`  : cats and dogs are lovely  |
| `$`     | $ 앞의 문자로 끝남                                           | `cats$` : they are my cats           |
| `|`     | 또는                                                         | `c(a|b)t` : cat, cbt                 |
| `()`    | 정규식을 그룹으로 묶음                                       | 아래 참조                            |
| `(?=)`  | 전방탐색 : ?= 뒤에 오는 문자를 기준으로  앞부분을 탐색       | 아래 참조                            |
| `(?<=)` | 후방탐색 :  ?<= 뒤에 오는 문자를 기준으로 뒷부분을 탐색      | 아래 참조                            |



## 2) re모듈
파이썬 내장 라이브러리로, `import re` 하여 사용한다.



### ✅ re.match('정규표현식', '검사할데이터')

검증할 데이터의 **시작 부분**이 정규표현식에 부합되는지 검증

정규표현식에 부합되면 `Match 객체`, 부합되지 않으면 `None`을 반환

```python
print(re.match('ab', 'ab'))  # <re.Match object; span=(0, 2), match='ab'>
print(re.match('ab', 'a'))  # None
print(re.match('ab', 'b'))  # None
print(re.match('ab', 'test'))  # None
```

```python
print(re.match('[0-9]', '123'))  # <re.Match object; span=(0, 1), match='1'>
print(re.match('[0-9]', '356'))  # <re.Match object; span=(0, 1), match='3'>
print(re.match('[0-9]', 'd12'))  # None
print(re.match('[0-9]', '1a23'))   # <re.Match object; span=(0, 1), match='1'>
```

```python
print(re.match('[0-9]*', 'd12'))  # <re.Match object; span=(0, 0), match=''>

print(re.match('a+b', 'aaab'))  # <re.Match object; span=(0, 4), match='aaab'>
print(re.match('a+b', 'aaab'))  # None

print(re.match('a?', 'b'))  # <re.Match object; span=(0, 0), match=''>
```

```python
print(re.match('^[A-Z]', 'Hello'))  # <re.Match object; span=(0, 1), match='H'>
print(re.match('^[A-Z]', 'hello'))  # None  

print(re.match('[^A-Z]', 'Hello'))  # None
print(re.match('[^A-Z]', 'hello'))  # <re.Match object; span=(0, 1), match='h'>
```



### ✅ re.search('정규표현식', '검사할데이터')

검증할 데이터가 정규표현식에 부함되는 문자열을 **포함**하는지 검증

```python
print(re.search('ab', 'tab'))  # <re.Match object; span=(1, 3), match='ab'>
print(re.search('ab', 'aa'))  # None
print(re.search('ab', 'ba ab'))  # <re.Match object; span=(3, 5), match='ab'>
print(re.search('ab', 'test'))  # None
```

```python
print(re.search('[0-9]+$', 't13est0'))  # <re.Match object; span=(6, 7), match='0'>
print(re.search('[0-9]+$', '2test'))  # None
```

```python
print(re.search('\*+', 'aa'))  # None
print(re.search('\*+', 'a*a'))  # <re.Match object; span=(1, 2), match='*'>
print(re.search('\*+', '**'))  # <re.Match object; span=(0, 2), match='**'>

# \*  : 앞에 역슬래쉬를 붙여서 메타문자로서의 *이 아니라 문자열 데이터로서의 * 의미
```



### ✅ re.findall('정규표현식', 찾을대상)
정규표현식에 부합하는 것을 모두 찾아 리스트로 반환

```python
data = re.findall('2\d{3}', 'hi 9234 hello 2345 ..bye 2456')
print(data)  # ['2345', '2456']
```



### ✅ re.split('정규표현식', 찾을대상)

정규표현식에 부합하는 부분을 기준으로 문자열을 쪼개서 리스트로 반환

```python
data = re.split('2\d{3}', 'hi 9234 hello 2345 ..bye 2456')
print(data)  # ['hi 9234 hello ', ' ..bye ', '']

data = re.split('a', 'abaabca', '2')  # 세번째 파라미터 - 쪼갤 횟수 지정 (그 이상은 쪼개지지 않음)
print(data)  # ['', 'b', 'abca']
```


### ✅ re.sub('정규표현식', '바꿀문자', 찾을대상)

정규표현식에 부합하는 부분을 2번째 파라미터(바꿀 문자열)로 교체함

```python
data = re.sub('apple|orange', '과일', 'apple 9234 orange 2345 data 26 test')
print(data)  # 과일 9234 과일 2345 data 26 test
```



### ✅ re.compile('정규표현식')

정규표현식을  미리 객체로 만들어놓고 사용

```python
pattern = re.compile('[a-z]+[.][^b]+')

print(pattern.match("test.txt"))  # <re.Match object; span=(0, 8), match='test.txt'>
print(pattern.match("test.bat"))  # None
```



### ⚡ 정규표현식 그룹화 `()` 사용 예제

(1) json 포맷의 데이터 `{"name" : "bori"}`를 xml 포맷 `<name>bori</name>`으로 변경해보기

```python
result = re.sub('({\s*})"(\w+)":\s*"(\w+)"(\s*})', '<\\2>\\3</\\2>', '{"name" : "bori"}')
# \\2 : 그룹화한 것들 중 2번째 그룹을 나타냄
```



(2) 정규식 그룹에 이름 부여해보기 -  `(?P<이름>정규표현식)`

```python
data = re.match('(?P<이름>\w+)\s(?P<전화번호>\d{3}-\d{4}-\d{4})', '보리 010-1111-2222')

print(data.group(0))  # 보리 010-1111-2222
print(data.group(1))  # 보리
print(data.group('이름'))  # 보리
print(data.group(2))  # 010-1111-2222
print(data.group('전화번호'))  # 010-1111-2222
```



### ⚡ 전방탐색 `(?=)` , 후방탐색 `(?<=)` 사용 예제

```python
data = re.search('.+(?=:)', 'http://www.google.com')  
# : 를 기준으로 앞부분에서 .+ 정규표현식에 부합하는 패턴을 포함하는지 검증

print(data)  # <re.Match object; span=(0, 4), match='http'>
```



```python
data = re.search('(?<=:)(//)(.+)', 'http://www.google.com')
# : 를 기준으로 뒷부분에서 검증하되, //와 일치하는 부분과 .+와 일치하는 부분을 그룹화

print(data) # <re.Match object; span=(5, 21), match='//www.google.com'>
print(data.group(1))  # //
print(data.group(2))  # www.google.com
```



