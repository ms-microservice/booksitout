FROM openjdk:17-oracle

MAINTAINER JINKYUM PARK
WORKDIR ./
ARG JAR_FILE_PATH=./build/libs/*.jar

ARG JWT_KEY
ARG DB_URL
ARG DB_ID
ARG DB_PW
ARG EMAIL_ID
ARG EMAIL_PW
ARG OAUTH_NAVER_CLIENT_ID
ARG OAUTH_NAVER_CLIENT_SECRET
ARG OAUTH_GOOGLE_CLIENT_ID
ARG OAUTH_GOOGLE_CLIENT_SECRET

# PROFILE
ENV SPRING_ACTIVE_PROFILE=prod,oauth,email
# SECURITY
ENV JWT_SECRET_KEY=$JWT_KEY
# DB
ENV BOOK_IT_OUT_DB_URL=$DB_URL
ENV BOOK_IT_OUT_DB_USERNAME=$DB_ID
ENV BOOK_IT_OUT_DB_PASSWORD=$DB_PW
#EMAIL
ENV BOOK_IT_OUT_EMAIL_HOST=smtp.gmail.com
ENV BOOK_IT_OUT_EMAIL_PORT=587
ENV BOOK_IT_OUT_EMAIL_USERNAME=$EMAIL_ID
ENV BOOK_IT_OUT_EMAIL_PASSWORD=$EMAIL_PW
#OAuth
ENV OAUTH_NAVER_CLIENT_ID=$OAUTH_NAVER_CLIENT_ID
ENV OAUTH_NAVER_CLIENT_SECRET=$OAUTH_NAVER_CLIENT_SECRET
ENV OAUTH_GOOGLE_CLIENT_ID=$OAUTH_GOOGLE_CLIENT_ID
ENV OAUTH_GOOGLE_CLIENT_SECRET=$OAUTH_GOOGLE_CLIENT_SECRET

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]