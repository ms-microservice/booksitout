<p align="center">
  <img width="600" height="450" src="[https://www.jinkyumpark.com/static/media/book-it-out.1b62adcff460809f72c7.png](https://user-images.githubusercontent.com/61900235/215242113-b2a0a6cb-7fae-4fd8-870d-60837baa17e3.png)">  
</p>

# 직접 사용해 보기
https://book.jinkyumpark.com

# 📗 책-it-out (book-it-out) 소개
Check it out! 친구에게 무언가를 추천할때 흔히 쓰는 영어 표현입니다.
어렸을때는 친했지만, 어느세 책과 멀어진 사람들에게는 책 읽는 즐거움을 다시.
책을 좋아하는 책 벌레들에게는 나의 독서 활동을 기록할 수 있는,
책에 관한 모든 것이 있는 종합 책 플렛폼입니다.

# ⚙️ 주요기능
-   내 독서활동을 기록 : 책을 읽을 떄 기록을 누르고, 끝날 때 종료를 누르면 내 독서활동을 기록해 줘요. 독서 중간중간에는 인상깊은 구절을 써 두거나, 내 생각을 메모할 수 있어요.
-   내가 읽은 책을 기록 : 평점, 리뷰, 독서활동을 한 번에 볼 수 있어요.
-   내 독서활동을 공유 : 특정 책이나 내 프로필을 다른 사람들과 공유할 수 있어요.
-   책 찾기 : "책을 읽고 싶다"고 마음 먹어도, 새 책을 살지, 산다면 어디서 살지, 중고책을 살지, 도서관에 갈지, 전자책을 살지, 내가 구독하고 있는 전자책 플랫폼에 혹시 이 책이 있지는 않은지, 한 번에 모아서 알려줘요.
-   책 추천 : 내가 읽은 책, 혹은 내가 입력한 키워드를 바탕으로 책을 추천해 줘요.
-   좋은 UX : 공공기관의 도서관 사이트를 쓰면서 답답하신적이 있나요? 공공 API를 활용해서 나쁜 UX를 경험하면서 답답하시지 않게 책-it-out이 대신 책을 찾아드려요. 도서 예약도 대신 해 드릴 수 있어요.

# 🧑‍🔧 사용된 기술 (V2 기준)
### DB
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![jpa](https://img.shields.io/badge/JPA-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)

### Server
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![springboot](https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![springsecurity](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![junit5](https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=JUnit5&logoColor=white)(+ Mockito, AssertJ)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### DevOps
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) (EBS, EC2, RDS, S3)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

# 🆚 버전역사
## Version 1 (22년 10월 29일 ~ 23년 1월 14일)
-   소개 : 소개 페이지, QNA/FAQ
-   책 관리 : 책 등록, 메모/인용 추가, 읽은 책 별점/리뷰 (Google 검색 API 활용)
-   독서활동 측정 : 책 읽을 떄 마다 타이머로 측정해 통계 제시
-   Security : Spring Security, Http-only Cookie로 저장하는 JWT
-   Gradle, Docker, AWS EBS, Github Actions를 사용한 CI/CD

## Version 2 (22년 1월 15일 ~ )
-   OAuth 로그인 : Google, Facebook, Kakao, Naver 구현. Spring Security 내부 모듈 사용
-   검색 : 알라딘, 공공도서관, 전자도서관 등의 Open API와 Web Crawling으로 MSA 기반의 종합 검색 기능 구현
-   코드개선
    - Back : Spring Webflux, Kotlin 등 도입해서 refactoring 진행, DDD 기반 Architecture로 개선, QueryDSL 사용
    - Front : TS, Redux, axios 등 도입해서 refactoring 진행, Architecture 개선
    - DevOps : Integration/Unit Test 작성해 통과할 경우에만 main branch에 push 가능하게 개선
- 성능개선 : Spring Actuator, Spring Cloud Sleuth와 Zipkin을 사용해 병목 부분 찾아내 개선

### Architecture Diagram
<p align="center">
  <img width="900" height="675" src="https://user-images.githubusercontent.com/61900235/208791246-55ec74ce-200e-4ddf-9250-2634a54dd277.png">  
</p>

### ER Diagram
<p align="center">
  <img width="900" height="675" src="https://user-images.githubusercontent.com/61900235/208791254-e5cfce24-8fe4-4d60-9441-a37d324c42c0.png">  
</p>
