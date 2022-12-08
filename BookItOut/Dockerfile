FROM adoptopenjdk/openjdk11

MAINTAINER JINKYUM PARK
ARG JAR_FILE_PATH=./build/libs/*.jar
WORKDIR ./

ENV SPRING_ACTIVE_PROFILE=prod
ENV BOOK_IT_OUT_SECRET_KEY=really-really-secret-key-of-book-it-out-that-can-not-be-reavled
ENV BOOK_IT_OUT_DB_URL=jdbc:mysql://localhost:3306/book
ENV BOOK_IT_OUT_DB_USERNAME=bookitout
ENV BOOK_IT_OUT_DB_PASSWORD=password

EXPOSE 80

CMD ["./mvnw", "clean", "build"]
COPY ${JAR_FILE_PATH} ./bookitout.jar
ENTRYPOINT ["java", "-jar", "bookitout.jar"]