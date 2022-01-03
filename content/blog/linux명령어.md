## Linux

클라우드 os로 사용

🔑 window 환경에서 linux 명령 사용하기 - `Cygwin` 설치



- pwd

  현 위치 경로 확인

- ls

  현 디렉터리 내 있는 파일들 확인

- ls -a

  설정파일 등 숨겨져 있는 파일까지 확인

- ls -al

- mkdir

  디렉터리 생성

- rmdir

  디렉터리 삭제

- vi 

  vi편집기로 내용 입력하면서 파일 생성

  ```
  $ vi text.txt
  ```

  - i   데이터 입력 시작
  - esc → :wq!    저장 후 종료
  - esc → :q!    저장 안하고 종료

- echo 

  (소량의) 내용 입력하면서 파일 생성

  ```
  $ echo "hello" > test2.txt
  ```

- rm -f  

  파일 삭제

- cat

  파일 내용 확인

- less

  파일 내용 한줄씩 확인 가능. 위아래 화살표로 이동. q 누르면 나가기

- more  

- head  / tail

  맨 첫 / 맨 마지막 n줄 확인

  ```
  $ head -n 3 test.txt
  ```

  

- touch

  빈 파일 생성

- mv

  folder 라는 디렉터리로 test.txt 라는 파일을 이동

  ```
  $ mv test.txt folder/
  ```

  

- cp

  파일 복사

  ```
  $ cp test.txt test2.txt
  ```

  

- grep

  문서에서 검색

  ```
  $ grep 검색어 test.txt
  ```

  



윈도우에서 우분투 os로 파일 복사

scp -i mykey.pem -r a.txt ubuntu@ec2-54-180-80-238.ap-northeast-2.compute.amazonaws.com:/home/ubuntu  

