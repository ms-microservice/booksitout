FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar
ENV SPRING_PROFILES_ACTIVE=prod,log,route

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]