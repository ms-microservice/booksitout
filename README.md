<p align="center">
  <img width="600" height="450" src="https://user-images.githubusercontent.com/61900235/237720750-2e3e3d44-af5d-46fa-ba9c-d5413ef55f2b.png">
</p>

# Multi Language README

- [Korean (한국어)](https://github.com/jinkyumpark/booksitout/blob/main/README-kr.md)

# Available at:
https://booksitout.com

# 🙋 What is booksitout?
- Initially, it began as my portfolio website; however, over time, I developed a strong desire to transform it into a fully-fledged product. As a result, I am now passionately dedicated to its development.
- Being a huge bookworm, I have amassed a bunch of ideas and insights during my reading journeys. I'm incorporating these ideas into the product.
- BOOKSITOUT caters to both ardent book enthusiasts and individuals seeking to cultivate a deeper relationship with books, offering a comprehensive range of functionalities.

# ⚙️ Main Functionality
- Add / manage my books
- View my reading statistics
- Search with ease (supports South Korea only as of May 2023)
- Talk about books with others

# 🧑‍🔧 Technology Stack (as of version 4)
## DB
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![jpa](https://img.shields.io/badge/JPA-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) (Hibernate, QueryDSL)

## Server
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![springboot](https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
![springsecurity](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![junit5](https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=JUnit5&logoColor=white)(+ Mockito, AssertJ)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)
![ReactiveX](https://img.shields.io/badge/ReactiveX-B7178C?style=for-the-badge&logo=ReactiveX&logoColor=white) (Spring Webflux)

![Spring Cloud](https://img.shields.io/badge/SpringCloud-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
- Spring Cloud Gateway, Spring Cloud Config (using Github as backend), Eureka, Hystrix
- Open Feign
- Logging : Sleuth, Zipkin

![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)

## DevOps
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- Elastic Beanstalk
    - used until I transfer to MSA
    - Changed to EC2 due to lack of customization and inability to view logs during deployments
- EC2
- RDS (MySQL)
- S3

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

[//]: # (![Kubernetes]&#40;https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white&#41;)

## Frontend
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
  <img height="500" src="https://user-images.githubusercontent.com/61900235/208791246-55ec74ce-200e-4ddf-9250-2634a54dd277.png">  
</p>

### MSA Diagram (from v4)
<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/61900235/237717617-8de30586-ddfb-4d27-881b-247996a738b7.png">  
</p>

### ER Diagram (from v3)
<p align="center">
  <img height="500" src="https://github.com/jinkyumpark/booksitout/assets/61900235/0e162c56-8b14-44b2-a498-ffb9c254b451">  
</p>

# 🆚 Version History
## Version 1, MVP (Oct. 29, 2022 - Jan. 14, 2023)
-   Introduction : Boarding Page, QNA, FAQ
  - Manage Books : register my books, add memos, quotations(deprecated), ratings, reviews, and summary
    - used [Google Search API](https://developers.google.com/custom-search/v1/overview) to search book cover
-   Measure your reading time
-   Login
    - Spring Security
    - JWT token stored in Http-only Cookie
    - Email verifications using JMS
-   CI/CD
    - based on Github Actions 
    - used AWS Elastic Beanstalk with docker-compose
    - Alert to slack using [Slack API](https://api.slack.com/automation/logging)

## Version 2, OAuth2 / Search (Jan. 15, 2023 - Feb. 6, 2023)
-   OAuth 2.0
    - Implemented : Google, Facebook, Kakao, Naver
    - Used Spring Security 5 Features
-   Search
    - Used books, Public Library, Online Library, Subscriptions
    - Used Public API if available
    - Implemented Web Crawler if necessary
-   Refactoring
    -   Refactored to multi-module gradle project before implementing MSA
    -   Refactor search modules to Kotlin
    -   Used QueryDSL to write some of the complex queries
    -   DDD Architecture : Service layer to ensure transaction and ordering, entity layer to store business logic 
    -   Front : used TS, Redux, Axios

## Version 3, Transitioning to MSA (Feb. 7 2023 - Apr. 28, 2023)
- MSA
    - Eureka, Spring Cloud Gateway, Spring Cloud Config
    - Security : Spring Cloud Gateway to validate JWT token and pass to other MSs
    - Divide modules to core, search, user
    - Sleuth, Zipkin to monitor

- Optimize search performance
    - Cache with Redis, set expiration time for appropriate business requirements
    - Asynchronous API requests : Spring Webflux, Coroutine in Kotlin

- Refactoring
    - remove table for statistics (too complex to ensure correctness)
    - manually written security to spring security's features

- Improve UI / UX
    - Set main color, keep color consistency across ui
      - red : behaviors accompanied state change, 
      - main green : most common behavior in certain situations
    - Improve mobile usage
      - automatically show keyboards when necessary
      - PWA support

## Version 4, Community (Apr. 29, 2023 - May. 14, 2023)
- Forum
    - Provide surveys, quizzes, free forum for each book 
    - Group with isbn13, DB schema to group isbn estimated to indicate the same books
    - Provide popular books (use Batch to process for certain intervals)

- Book Gatherings
    - share booksitout reading stats before each gatherings
    - accept/deny based on profiles
    - supports maps, notifications for easier gatherings

- Booksitout Tips (Admin write only)

## Version 5, Notifications (Scheduled)

## Version 6, Library (Scheduled)
