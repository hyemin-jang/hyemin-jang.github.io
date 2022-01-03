



## 4) _search API

### (1) URI 검색

### (2) Request Body 검색

- RESTful API 방식인 QueryDSL을 사용해 요청 본문(Request body)에 질의 내용을 추가해 검색 (JSON 형태)
- 쿼리의 조건이 복잡하고 길어질 경우 적합

- 





## 5) Query DSL

엘라스틱서치가 제공하는 JSON 스타일의 전용 언어

✅ Query 요청의 속성들

```python
{
    "size" : # 반환받는 Document 개수의 값. default 10개
    ,"from" : # 몇번째 문서부터 가져올지 지정. default 0
    ,"timeout" : # 검색 요청시 결과를 받는 데까지 걸리는 시간. timeout을 너무 작게하면 전체 샤드에서 timeout을 넘기지 않은 문서만 결과로 출력된다. default 무한
    ,"_source" : # 검색시 필요한 필드만 출력하고 싶을 때 사용
    ,"query" : # 검색 조건문을 설정할 때 사용
    ,"aggs" : # 통계 및 집계 데이터를 설정할 때 사용
    ,"sort" : # 문서 결과의 정렬 조건을 설정할 때 사용
}
```

✅ Query 응답의 속성들

```python
{
    "took" : # Query를 실행하는데 걸린 시간
    ,"timed_out" : # Query 시간이 초과했는지 True, False로 나타냄
    ,"_shards" : {
        "total" : # Query를 요청한 전체 샤드 개수
        ,"successful" : # Query에 성공적으로 응답한 샤드 개수
        ,"failed" : # Query에 실패한 샤드 개수
    }
    ,"hits" : {
        "total" : # Query에 매칭된 문서의 전체 개수
        ,"max_score" : # Query에 일치하는 문서의 스코어 값중 가장 높은 값
        ,"hits" : # Query 결과 표시
    }
}
```



### (1) Full Text Query

-  `match`
  - 문장을 형태소 분석을 통해 term으로 분리한 후 검색

- `match_phrase`
  - 

- `term`
  - 빠른데.. 
- `multi_match`
- 

### (2) Bool Query

- `must` : must절에 있는 모든 쿼리가 일치하는 문서 검색

- `must_not` : must절에 있는 모든 쿼리가 일치하지 않는 문서 검색

- `should` : should절에 있는 쿼리 중 하나라도 일치하는 문서 검색

- `filter` : must 절에 있는 모든 쿼리가 일치하는 문서 검색. **score에 영향을 주지 않는다!**

  





