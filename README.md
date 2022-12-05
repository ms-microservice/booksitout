# 바로 사용해 보기

https://book.jinkyumpark.com

# 책-it-out (book-it-out)
<img align="right" width="100" height="100" src="https://www.jinkyumpark.com/static/media/book-it-out.1b62adcff460809f72c7.png">

<p>
Check it out! 친구에게 무언가를 추천할때 흔히 쓰는 영어 표현입니다.
어렸을때는 친했지만, 어느세 책과 멀어진 사람들에게는 책 읽는 즐거움을 다시.
책을 좋아하는 책 벌레들에게는 나의 독서 활동을 기록할 수 있는,
책에 관한 모든 것이 있는 종합 책 플렛폼입니다.
</p>

# 주요기능

-   내 독서활동을 기록 : 책을 읽을 떄 기록을 누르고, 끝날 때 종료를 누르면 내 독서활동을 기록해 줘요. 독서 중간중간에는 인상깊은 구절을 써 두거나, 내 생각을 메모할 수 있어요.
-   내가 읽은 책을 기록 : 평점, 리뷰, 독서활동을 한 번에 볼 수 있어요.
-   내 독서활동을 공유 : 특정 책이나 내 프로필을 다른 사람들과 공유할 수 있어요.
-   책 찾기 : "책을 읽고 싶다"고 마음 먹어도, 새 책을 살지, 산다면 어디서 살지, 중고책을 살지, 도서관에 갈지, 전자책을 살지, 내가 구독하고 있는 전자책 플랫폼에 혹시 이 책이 있지는 않은지, 한 번에 모아서 알려줘요.
-   책 추천 : 내가 읽은 책, 혹은 내가 입력한 키워드를 바탕으로 책을 추천해 줘요.
-   좋은 UX : 공공기관의 도서관 사이트를 쓰면서 답답하신적이 있나요? 공공 API를 활용해서 나쁜 UX를 경험하면서 답답하시지 않게 책-it-out이 대신 책을 찾아드려요. 도서 예약도 대신 해 드릴 수 있어요.

# 사용된 기술 (최신 버전 기준)

## DB

-   MySQL
-   JPA (Hibernate)

## Server

-   Gradle
-   Spring Boot
-   Spring Security
-   JUnit, Mockito, AssertJ
-   Lombok

## Frontend

-   React
-   Bootstrap
-   SaSS

## DevOps

-   Docker
-   AWS EBS

# 버전역사

## Version 1 (22년 10월 29일 ~)

-   소개 : 소개 페이지, QNA/FAQ
-   책 관리 : 책 등록, 메모/인용 추가, 읽은 책 별점/리뷰
-   독서활동 측정 : 책 읽을 떄 마다 타이머로 측정해 통계 제시
-   Authentication, Authorization : Spring Security를 활용한 안전한 보안
