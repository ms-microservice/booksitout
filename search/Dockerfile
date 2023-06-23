FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar

EXPOSE 80
ENV SPRING_PROFILES_ACTIVE=prod,log,api

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]