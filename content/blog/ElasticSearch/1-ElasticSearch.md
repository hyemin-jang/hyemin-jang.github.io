



## ELK Stack

오픈소스 검색엔진.

`ElasticSearch` + `Logstash` + `Kibana`가 같이 사용되면서 **ELK Stack** 이라고 불림



### Kibana 

- 데이터 시각화 + CRUD 작업 도와주는 툴

(오라클의 sqldeveloper 같은 역할)



### Filebeat 

데이터 수집 및 전송

단말 장치의 데이터를 전송하는 경량 데이터 수집기 플랫폼



### Logstash

데이터 수집, 변환, 전송

데이터 가공 후 ElasticSearch에 저장 가능한 동적 데이터 수집 파이프라인





## 파이프라인

![The Easy Way to Test your Logstash Configuration | by Moody Saada | agolo](https://miro.medium.com/max/1838/1*5KjGbQj-IfE0g_z3xi7pNA.png)

[이미지 출처] https://blog.agolo.com/the-easy-way-to-test-your-logstash-configuration-3f80eb5ffd59



다운로드 : https://www.elastic.co/kr/downloads/

7.11.1 버전 다운로드





## Elasticsearch 

**분산형 RESTful 검색 및 분석 엔진**

`검색 엔진` / `데이터 분석` / `대용량 데이터 저장소` 역할을 하며, 빅데이터를 처리할 때 매우 유용하다.

관계형 데이터베이스(RDBMS)와 유사한 기능을 할 수 있다.



특징

- 매우 빠른 속도와 뛰어난 확장성
- 정형, 비정형 데이터를 모두 수용할 수 있는 유연성
- JSON 기반의 스키마 없는 저장소

- Restful API를 통해 CRUD 처리

- Transaction Rollback을 지원하지 않음

- NRT (Near Realtime) : 완전 실시간은 아님. 색인된 데이터는 1초 뒤에나 검색이 가능 (내부적으로 commit과 flush 같은 복잡한 과정을 거치기 때문)

- 데이터의 업데이트를 제공하지 않음 : 업데이트 명령이 올 경우 기존 문서를 삭제하고 새로운 문서를 생성 => 업데이트 하는 것에 비해 많은 비용이 들지만 이를 통해 불변성(Immutable)이라는 이점을 취함

- Multi-tenancy : 서로 상이한 인덱스일지라도 검색할 필드명만 동일하다면 여러 개의 인덱스를 한번에 조회 가능



### RDB vs Elasticsearch 



| RDBMS    | elastic search               |
| -------- | ---------------------------- |
| Database | Index                        |
| Table    | Type                         |
| Row      | ⭐Document                    |
| Column   | ⭐Field   {"field" : "value"} |
| Schema   | Mapping                      |
| Index    | Everything is indexed        |
| SQL      | Query DSL                    |

- Index : 데이터 저장 공간. Document들의 저장 집합체. 테이블이라는 맥락으로 보면 됨
- Document: 데이터를 저장하기 위한 최소 단위? JSON 형태. 
- Field: 문서를 구성하기 위한 속성







## 2) Elasticsearch 특징

### (1) 데이터 색인

>  💡 용어 정리
>
> #### `색인(Indexing)`
>
> - 원본 문서를 **검색이 가능한 구조인 토큰**들로 변환하여 저장하는 일련의 과정
> - RESTful API를 통해 index에 document를 추가하는 것이 바로 문서를 색인화하는 것
>
> #### `인덱스(Index)`
>
> - 색인 과정을 거친 결과물, 또는 색인된 데이터가 저장되는 저장소
> - Elasticsearch에서 document들의 논리적인 집합을 표현하는 단위
>
> #### `검색(Search)`
>
> - 인덱스에 들어있는 검색어 토큰들을 포함하고 있는 문서를 찾아가는 과정
>
> #### `질의(Query)`
>
> - 사용자가 원하는 문서를 찾거나 집계 결과를 출력하기 위해 입력하는 검색어 또는 검색 조건



### ⭐ 역 인덱스 (Inverted Index)

엘라스틱서치는 데이터를 저장할 때 **역 인덱스라는 구조를 만들어 저장한다.**

이해를 위해 전통적인 RDBMS의 저장 방식을 먼저 살펴보자.



#### ✅ RDBMS의 데이터 저장 방법

![img](https://files.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Ln04DaYZaDjdiR_ZsKo%2F-Lo--uX4jUMQUTUvBgeF%2F-LntIdlIDXEduASJCXRm%2F6.1-02.png?alt=media&token=158baec3-905d-4f92-8824-cac8d0239756)

위와 같이 데이터를 보이는 그대로 테이블 구조로 저장한다.

만약 `fox`라는 단어가 포함된 행들을 검색하고 싶으면, 모든 행을 한줄씩 찾아 내려가면서 fox가 있으면 가져오고 없으면 넘어가는 식으로 데이터를 검색하게 된다.

➡  행 안의 내용을 모두 읽어야 하기 때문에 기본적으로 느리다.

➡  데이터가 늘어날수록 검색해야 할 대상이 늘어나 시간이 오래 걸린다.

<br>

#### ✅ Elasticsearch의 데이터 저장 방법 : 역 인덱스 구조

**책 맨 뒤에 있는 찾아보기 페이지**에 비유할 수 있는 엘라스틱서치의 데이터 저장 방법!

- 엘라스틱서치에서는 데이터를 입력할 때 저장이 아닌 `색인`을 한다고 표현한다.

- 추출된 각 키워드를`텀(term)`이라고 한다.
- 역 인덱스가 있으면 **찾고자 하는 텀을 포함하고 있는 document들의 id를 바로 얻어올 수 있다.**

​    ![img](https://files.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Ln04DaYZaDjdiR_ZsKo%2F-LntL_BGpuFbNXy_sFtK%2F-LntLbibpXHABupWvXtu%2F6.1-03.png?alt=media&token=d2726f20-a7ea-4219-bcb0-340cbe1d21f1)

➡  데이터가 늘어나도 찾아가야 할 행이 늘어나는 것이 아니라, 역 인덱스가 가리키는 id의 배열에 값이 추가되는 것 뿐이기 때문에 **큰 속도의 저하 없이 빠른 속도로 검색이 가능하다!**

[이미지 출처]  https://esbook.kimjmin.net/06-text-analysis/6.1-indexing-data



<br>

### (2) 데이터 분산 처리

___Elasticsearch는 대용량 데이터의 증가에 따른 `Scale out`과 데이터 무결성을 유지하기 위한 `클러스터링`을 지원한다.___



#### ⚡ 클러스터 (Cluster)

- 여래 대의 노드를 네트워크로 연결하여 하나의 PC처럼 작동하게 하는 기술

#### ⚡ 노드 (Node)

- 단일 서버를 의미
- 1개의 물리 서버 = 하나의 노드
- 1개의 물리 서버 안에서 여러 개의 노드를 실행하는 것도 가능 (각 노드들은 9200, 9201, ... 순으로 포트번호를 사용하게 됨)

#### ⚡ Scale Up / Scale Out

- Scale Up : 사양 추가 (고가의 장비로 대체하여 처리 속도 향상)
- Scalue Out : 장비 추가 (하나의 장비에서 처리하던 일을 여러 장비로 나누어서 처리)
  - `= 분산처리` `=병렬처리`
  - 복잡한 계산 말고 **단순 데이터 처리가 많은 경우** 적합
  - 여러 대의 서버에 분산시킴으로써 장애 시 전면 장애의 가능성이 적음
  - 주요 기술 : `샤딩 (Sharding)`

#### ⚡ 샤드 (Shard)

- 샤딩 (Sharding) : 단일의 데이터를 다수의 데이터베이스로 쪼개는 것
- 샤드 : 샤딩을 통해 나누어진 블록

#### ⚡ 레플리카 (Replica)

- Primary Shard : 처음 생성된 샤드. **=원본**

- Replica : **=복제본**

  - Elasticsearch 7.0버전부터는 인덱스를 설정할 때 별도의 설정을 하지 않으면 디폴트로 **1개의 샤드**로 인덱스가 구성된다.

  - 클러스터에 노드를 추가하게 되면 샤드들이 각 노드들로 분산되고 디폴트로 **1개의 복제본**을 생성한다.

    ![img](https://files.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Ln04DaYZaDjdiR_ZsKo%2F-LnUxLhQtL_hJwYydM_5%2F-LnKhmx31SnLDNMKr_YT%2Fimage.png?alt=media&token=fc99a84d-5f9f-4d3d-aad6-21e503567b33)

    ↑ 5개의 primary shard와 그 복제본을 4개의 노드에 분산해서 저장하는 예

    [이미지 출처] https://esbook.kimjmin.net/03-cluster/3.2-index-and-shards





- Primary Shards : 처음 생성된 샤드. 원본.
- Replica Shards : primary shards를 복제하여 다른 노드에 저장 
  - primary shards와 replica shards는 같은 데이터를 담고 있으며 반드시 서로 다른 노드에 저장돼야 함
  - 노드 유실시 유실된 shards는 자동으로 복제됨



#### ⚡ 버킷 (Bucket)

- 히스토그램에서 동일한 크기의 구간을 몇 개로 잡을 것이냐 를 결정하는 요소
- 각 버킷은 동일한 값 범위를 표현



```
# 테이블 및 데이터 생성
POST hello_index/_doc/1
{
  "name": "bori",
  "age": 6
}

# 존재하는 데이터 검색
GET hello_index/_doc/1
```



## CRUD

1. POST
   - _doc
   - _create
2. PUT
   - _doc
   - _create

💡 bulk API

```
# CRUD 작업 해보기

# 1. create  - index에 type(=테이블) 생성 및 데이터 저장

# _doc: id 미존재시 생성, 존재하는 경우 update
POST hello_index/_doc/1  
{
  "name": "bori",
  "age": 6
}


# _create : id 중복되는 경우 update 되는게 아니라 에러남
POST hello_index/_create/1 
{
  "name": "ritae",
  "age": 4
}

# 이건가능
POST hello_index/_create/2
{
  "name": "ritae",
  "age": 4
}

# PUT방식
delete hello_index

put hello_index/_doc/1
{
  "name": "bori",
  "age": 6
}

# update
put hello_index/_doc/1
{
  "name": "ritae",
  "age": 4
}


delete hello_index

# POST 방식에서 id를 명시하지 않으면 랜덤으로 자동생성
POST hello_index/_doc
{
  "name": "bori",
  "age": 6
}

post hello_index/_doc
{
  "name": "ritae",
  "age": 4
}

# _create 로는 불가. "invalid_type_name_exception"
POST hello_index/_create
{
  "name": "bori",
  "age": 6
}

# 한꺼번에 많은 데이터 넣기
POST _bulk
{"index":{"_index":"employees","_id":"1"}}
{"firstName":"John","lastName":"Doe"}
{"index":{"_index":"employees","_id":"2"}}
{"firstName":"Anna","lastName":"Smith"}
{"index":{"_index":"employees","_id":"3"}}
{"firstName":"Peter","lastName":"Jones"}



POST _bulk
{"index":{"_index":"account","_id":"1"}}
{"account_number":1,"balance":3926,"firstname":"Amber","lastname":"Duke","age":7,"gender":"M","address":"880 Holmes Lane","employer":"Pyrami","email":"amberduke@pyrami.com","city":"Brogan","state":"IL"}
{"index":{"_index":"account","_id":"2"}}
{"account_number":2,"balance":5282,"firstname":"Hattie","lastname":"Bond","age":7,"gender":"M","address":"271 Bristol Street","employer":"Netagy","email":"hattiebond@netagy.com","city":"Dante","state":"TN"}
{"index":{"_index":"account","_id":"3"}}
{"account_number":3,"balance":7838,"firstname":"Nanette","lastname":"Bates","age":28,"gender":"F","address":"789 Madison Street","employer":"Quility","email":"nanettebates@quility.com","city":"Nogal","state":"VA"}

# F 값을 보유하고 있는 데이터 검색 
GET account/_search/?q=F
# gender가 F인 데이터 검색
GET account/_search/?q=gender:F
# 같은 표현 - Body 검색 방법
GET account/_search
{
  "query": {
    "match": {
      "gender": "F"
    }
  }
}


# gender가 M이고 state가 TN인 데이터 검색
GET account/_search/?q=gender:M AND state:TN
# 같은 표현
GET account/_search
{
  "query": {
    "query_string": {
      "default_field": "gender",
      "query": "gender:M AND state:TN"
    }
  }
}




POST my_index/_bulk
{"index":{"_id":1}}
{"message":"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
{"index":{"_id":2}}
{"message":"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다"}
{"index":{"_id":3}}
{"message":"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 너는 괴로워했다"}
{"index":{"_id":4}}
{"message":"chrome google Chrome Google"}
{"index":{"_id":5}}
{"message":"하늘사 Google Chrome"}
{"index":{"_id":6}}
{"message":"pink"}
{"index":{"_id":7}}
{"message":"pinkRed"}
{"index":{"_id":8}}
{"message":"pink red blue"}
{"index":{"_id":9}}
{"message":"pink red blue black"}
{"index":{"_id":10}}
{"message":"pink red blue black green"}
{"index":{"_id":11}}
{"message":"pink blue red black green"}
{"index":{"_id":12}}
{"message":"pink pink"}

GET my_index
GET my_index/_search
GET my_index/_doc/9  # id가 9번인 데이터 검색


# index값 13 저장
POST my_index/_doc/13
{
  "message": "encore playdata"
}

GET my_index/_doc/13

# Google이라는 단어가 포함된 문서 검색
GET my_index/_search
{
  "query": {
    "match": {
      "message": "google"
    }
  }
}  
# 뜻만 일치되면 대소문자 상관없이 다 검색됨

GET my_index/_search
{
  "query": {
    "match": {
      "message": "Chrome Google"
    }
  }
}  
# match를 쓰면 term 단위로 검색 (or 조건으로 검색됨)
# 즉 chrome이 들어가거나, google이 들어간 문서 모두 검색됨

GET my_index/_search
{
  "query": {
    "match_phrase": {
      "message": "Chrome Google"
    }
  }
} 
# match_phrase를 쓰면 구절 단위로 검색 


POST my_index/_doc/14
{
  "message": "playdata encore sw ai"
}
GET my_index/_search
{
  "query": {
    "match_phrase": {
      "message": "playdata encore"
    }
  }
} 
GET my_index/_search
{
  "query": {
    "match": {
      "message": "playdata encore"
    }
  }
} 


# 모든 검색
GET my_index/_search
# 위와 같이 하면 default값이 10개라서 한번에 더 많은 데이터를 검색하고 싶을때
GET my_index/_search
{
  "size": 20
}

# 같은표현
GET my_index/_search
{
  "size": 20,
  "query": {
    "match_all": {}
  }
}

```



## Search API

