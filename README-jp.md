<p align="center">
  <img width="600" height="450" src="https://user-images.githubusercontent.com/61900235/237720750-2e3e3d44-af5d-46fa-ba9c-d5413ef55f2b.png">
</p>

# 実際に使ってみれる場所
https://booksitout.com

# 🙋 Booksitoutってなに？
- 最初は勉強の目的で始まったプロジェクトでしたが、今は世界中の本好きの読書生活を、少しでも楽にするためにいろんな便利な機能を提供するウェブサイトです。
- 自分自身も本好きのため、本を読みながらこんなことがあったらいいなーと思ったいろんなことを貯めるために今も頑張って作ってます。
- しかし、本好きのためだけではなく、本と親しくなりたい人や、たまに読む人などにも役に立ちます。

# ⚙️ 主な機能
- 読んでいる本を追加し、読書をタイマーで計れます。
- 計った読書を基づいて統計を見れます。
- いろんな所で一気に本を検索できます。（図書館、フォローサービス、中古の本など）（今現在、韓国でしか使えません）
- 他の人たちと本の話をする。

# 🧑‍🔧 使われた技術 (バージョン４)
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

[//]: # (![ReactiveX]&#40;https://img.shields.io/badge/ReactiveX-B7178C?style=for-the-badge&logo=ReactiveX&logoColor=white&#41; &#40;Spring Webflux&#41;)

![Spring Cloud](https://img.shields.io/badge/SpringCloud-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
- Spring Cloud Gateway, Spring Cloud Config (using Github as backend), Eureka, Hystrix
- Open Feign
- Logging : Sleuth, Zipkin

[//]: # (![Apache Kafka]&#40;https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka&#41;)

## DevOps
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- Elastic Beanstalk
    - used until I transfer to MSA
    - Changed to EC2 due to lack of customization and inability to view logs during deployments
- EC2
- RDS (MySQL)
- S3
- SQS

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

[//]: # (![Kubernetes]&#40;https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white&#41;)

## Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

[//]: # (![React Query]&#40;https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white&#41;)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# 📊 図式
### CI/CD 図式 (バージョン１)
<p align="center">
  <img src="https://user-images.githubusercontent.com/61900235/208791246-55ec74ce-200e-4ddf-9250-2634a54dd277.png">  
</p>

### MSA 図式 (バージョン４)
<p align="center">
  <img src="https://user-images.githubusercontent.com/61900235/237717617-8de30586-ddfb-4d27-881b-247996a738b7.png">  
</p>

### ER 図式 (バージョン３)
<p align="center">
  <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/0e162c56-8b14-44b2-a498-ffb9c254b451">  
</p>

# 🆚 バージョン履歴
## バージョン１、 MVP (２２年１０月２９日から２３年１月１４日まで)

## バージョン２、 検索、ログイン (２３年１月１５日から２３年２月６日まで)

## バージョン３、 MSAへ転換 (２３年２月７日から２３年４月２８日まで)

## バージョン４、 フォーラムの投稿 (２３年４月２９日から２３年５月２２日まで)

## バージョン５、 アラム (予定)

## バージョン６、 図書館 (予定)