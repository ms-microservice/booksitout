FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./
ARG JAR_FILE_PATH=./build/libs/*.jar

ARG jwtcode
ARG dburl
ARG dbid
ARG dbpw
ARG emailid
ARG emailpw

# PROFILE
ENV SPRING_ACTIVE_PROFILE=prod
# SECURITY
ENV JWT_SECRET_KEY=$jwtcode
# DB
ENV BOOK_IT_OUT_DB_URL=$dburl
ENV BOOK_IT_OUT_DB_USERNAME=$dbid
ENV BOOK_IT_OUT_DB_PASSWORD=$dbpw
#EMAIL
ENV BOOK_IT_OUT_EMAIL_HOST=smtp.gmail.com
ENV BOOK_IT_OUT_EMAIL_PORT=587
ENV BOOK_IT_OUT_EMAIL_USERNAME=$emailid
ENV BOOK_IT_OUT_EMAIL_PASSWORD=$emailpw

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]