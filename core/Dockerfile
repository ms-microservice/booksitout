FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar

ARG DB_URL
ARG DB_ID
ARG DB_PW

ENV DB_URL=$DB_URL
ENV DB_ID=$DB_ID
ENV DB_PW=$DB_PW

EXPOSE 8000

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./booksitout.jar
ENTRYPOINT ["java", "-jar", "booksitout.jar"]