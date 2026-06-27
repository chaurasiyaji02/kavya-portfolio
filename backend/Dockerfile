FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /workspace
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -DskipTests dependency:go-offline

COPY src src
RUN ./mvnw -B -DskipTests clean package

FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S portfolio && adduser -S portfolio -G portfolio
WORKDIR /app
COPY --from=build /workspace/target/portfolio-0.1.0-SNAPSHOT.jar app.jar

USER portfolio
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
