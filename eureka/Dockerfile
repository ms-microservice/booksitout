FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar

EXPOSE 8761

ENV SPRING_PROFILES_ACTIVE=prod

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./booksitout.jar

ENTRYPOINT ["java", "-jar", "booksitout.jar"]