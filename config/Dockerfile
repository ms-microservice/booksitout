FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8888

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./booksitout.jar
ENTRYPOINT ["java", "-jar", "booksitout.jar"]