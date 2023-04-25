FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar

ARG JWT_SECRET

ENV JWT_SECRET=$JWT_SECRET

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]