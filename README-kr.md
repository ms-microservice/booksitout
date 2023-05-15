<p align="center">
  <img width="600" height="450" src="https://user-images.githubusercontent.com/61900235/237720750-2e3e3d44-af5d-46fa-ba9c-d5413ef55f2b.png">
</p>

# 직접 사용해 보기
https://booksitout.com

# 🙋 책잇아웃 (booksitout) 이 뭔가요?
- 제가 책을 좋아해서 포트폴리오용 사이트로 책을 읽으면서 느낀 불편한 점을 해결하고, 있었으면 좋겠다고 생각한 기능을 담은 종합 책 커뮤니티입니다.
- 처음에는 단순 포트폴리오용으로 만들었지만, 갈 수록 서비스에 애정이 생겨 현재는 실제 출시까지를 목표로 열심히 개발 중입니다.
- 이름의 유래는 "Check it out" 이라는 영어 표현에서 유래했습니다. 무언가를 권할 때 쓰는 표현인데, 책을 권하는 마음, 언어유희를 담았습니다.

# ⚙️ 주요기능
-   내가 읽는 책, 독서활동, 메모 기록
-   책 검색 : 도서관, 전자 도서관, 구독, 중고책 한 번에 검색 (Open API, 웹 크롤링 활용)
-   커뮤니티 
    - 책을 지정해서 책에 관한 얘기, 퀴즈, 조사 가능
    - 독서모임 모집, 사이트 내 책 측정을 서로 공유할 수 있음
    - 매일 인기 책 알려줌 (Spring Batch로 매일 취합, 인기 알고리즘 구현)
-   책 알림 : 내가 읽고 싶은 책을 등록해 놓으면 원하는 곳에서 등록 될 떄 알림 (Spring Batch, Kafka 사용)
-   도서관 관련 편의 기능
    - 대출 / 예약 이력 사이트 내에서 관리
    - 도서관 회원증 등록 (애플웰렛, 삼성페이, 사이트 자체)
    - 도서관 책 검색 가능 (Spring Batch로 자체 DB 구축함)
    - 근처 도서관 검색

# 🧑‍🔧 사용된 기술 (V4 기준)
### DB
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![jpa](https://img.shields.io/badge/JPA-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) (Hibernate, QueryDSL)

### Server
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![springboot](https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![springsecurity](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![junit5](https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=JUnit5&logoColor=white)(+ Mockito, AssertJ)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)
![ReactiveX](https://img.shields.io/badge/ReactiveX-B7178C?style=for-the-badge&logo=ReactiveX&logoColor=white) (Spring Webflux)

![Spring Cloud](https://img.shields.io/badge/SpringCloud-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) 
- Spring Cloud Gateway, Spring Cloud Config (Github를 Backend로 사용), Eureka, Hystrix
- Open Feign
- Logging : Sleuth, Zipkin

![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)

### DevOps
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- Elastic Beanstalk
  - MSA로 전환하기 전까지 사용
  - MSA로 바꾸고 Deploy 중 log를 보지 못 하는 것과, 상세하게 직접 관리하고 싶어 기본 EC2로 변경 
- EC2
- RDS (MySQL)
- S3

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

[//]: # (![Kubernetes]&#40;https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white&#41;)

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# 📊 Diagram
### CI/CD Diagram (from v1)
<p align="center">
  <img src="https://user-images.githubusercontent.com/61900235/208791246-55ec74ce-200e-4ddf-9250-2634a54dd277.png">  
</p>

### MSA Diagram (from v4)
<p align="center">
  <img src="https://user-images.githubusercontent.com/61900235/237717617-8de30586-ddfb-4d27-881b-247996a738b7.png">  
</p>

### ER Diagram (from v4)
<p align="center">
  <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/0e162c56-8b14-44b2-a498-ffb9c254b451">  
</p>

# 🆚 Version History
## Version 1, MVP (10월 29일, 2022 ~ 1월 14일)
-   소개 : 소개 페이지, QNA, FAQ
-   책 관리 : 책 등록, 메모/인용 추가, 읽은 책 별점/리뷰 (Google 검색 API 활용)
-   독서활동 측정 : 책 읽을 떄 마다 타이머로 측정해 통계 제시
-   Login : Spring Security, Http-only Cookie로 저장하는 JWT, JMS를 통해 이메일 인증 
-   CI/CD : Gradle, Docker, AWS EBS, Github Actions를 사용. Slack으로 실시간 알림

## Version 2, OAuth2 / 검색 (23년 1월 15일 ~ 23년 2월 6일)
-   OAuth 로그인 : Google, Facebook, Kakao, Naver 구현. Spring Security 내부 모듈 사용
-   검색 : 중고도서(알라딘, YES24 등), 공공도서관(서울, 경기), 전자도서관, 구독서비스(밀리의 서재, 리디 등)을 Open API와 Web Crawling을 활용해 한 번에 검색
-   MSA 도입 전 Multi-module Project 형식으로 Refactoring
-   코드개선
    - Back : 검색 모듈 Kotlin 도입해서 refactoring 진행, DDD 기반 Architecture로 개선, QueryDSL 사용
    - Front : TS, Redux, axios 등 도입해서 refactoring 진행, Architecture 개선
    - DevOps
      - Integration/Unit Test 작성해 통과할 경우에만 main branch에 push 가능하게 개선
      - 실제 배포하기 전에 Production 환경에서 테스트 가능하도록 개선
      
## Version 3, MSA 전환 (23년 2월 7일 ~ 23년 4월 28일)
- MSA 도입
  - Infra 관련 : Eureka, Spring Cloud Gateway, Spring Cloud Config, user(인증/인가)
  - Business Logic 관련 : core (책, 메모, 독서기록, 목표, 통계 등), search, 
  - 모니터링 : Sleuth, Zipkin 도입
- 검색 성능 개선
  - Redis 도입해 서비스에 따라 결과 유효기간 설정 후 이미 검색한 Query는 API 요청 하지 않도록 개선
  - Spring Webflux, Coroutine 사용해 비동기적으로 API 요청 하도록 개선
- 코드 개선
  - Back
    - ms로 refactoring 후 전반적으로 코드 단순화
    - 잘 못 설계됐다고 생각한 Architecture 개선 (통계 처리를 위해 통계용 table DB에 따로 둔 것 등)
    - 보안 처리 직접 한 부분 Spring Security 기본 기능으로 refactoring
  - DevOps : K8S 도입 (AWS EKS 사용), CI 서버에서 캐싱 사용해 빌드 속도 약 40% 개선
  - Front : React-Query 사용해서 API 요청하도록 개선
- UI / UX 개선
  - 메인 색상 정해서 전체적으로 통일 + 각 색별 의미 정하고 그 의미로만 사용 (예 : 빨강 - 비교적 큰 상태 변화가 있는 행동, 메인초록 - 특정 상황에 가장 할 만한 행동)
  - 모바일 사용성 개선 (입력해야 될 상황에 키보드 자동으로 보이기, PWA 지원, 쓸데없는 autoComplete 숨기기)
  - 유저가 알고 싶은 정보는 강조, 아닌 정보는 색 secondary / 작게 (예 : 책 List에서 현재 페이지 bold / main-color로 강조)

## Version 4, 커뮤니티 (23년 4월 29일 ~ 23년 5월 14일)
- 커뮤니티
  - 책 별로 궁금한걸 물어볼 수 있는 설문, 퀴즈로 책 내용 복습, 자유롭게 얘기(포스트, 댓글, 좋아요)
  - isbn13을 기준으로 나눔 + 같은 책이라 판단할 수 있는 isbn13끼리 묶는 테이블 사용
  - 인기있는 책 순위 제공 (매일 새벽 Batch로 취합)

- 독서모임
  - 책잇아웃에 있는 독서측정 기능으로 서로 공유 가능
  - 각자의 프로필을 보고 수용/거절 가능
  - 약속 장소에서 쉽게 모일 수 있도록 알림 / 지도 제공

- 책잇아웃 꿀팁
  - 관리자가 올릴 수 있는 콘텐츠

## Version 5 (예정)
- 알림 : Spring Batch, Kafka를 사용해 내가 원하는 곳에서(도서관, 구독, 중고서점 등) 원하는 책이 등록되면 이메일로 알림
- 책 관련 컨텐츠 (사이트 이용 꿀팁, 도서관 관련 정보)

## Version 6, 도서관 관련 기능 (예정)
- 내 대출 현황 보기
- 디지털 도서관 회원증 추가 (애플월렛, 삼성페이, 이미지, 사이트에서 보기(위치 기반으로 도서관 근처에 있으면 자동으로 메인 화면 제일 위에))
