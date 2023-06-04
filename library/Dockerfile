FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
WORKDIR ./

ARG JAR_FILE_PATH=./build/libs/*.jar
ENV SPRING_PROFILES_ACTIVE=prod,api,log,actuator,membership,cloud

COPY ./src/main/resources/appleWallet/Certificates.p12 /path/in/docker/Certificates.p12
COPY ./src/main/resources/appleWallet/AppleWWDRCAG3.cer /path/in/docker/AppleWWDRCAG3.cer
COPY ./src/main/resources/appleWallet/template /path/in/docker/template

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]