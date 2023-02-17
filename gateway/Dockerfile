FROM openjdk:17-oracle

MAINTAINER JINKYUM PARK
WORKDIR ./
ARG JAR_FILE_PATH=./*.jar

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]