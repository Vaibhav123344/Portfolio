# Stage 1: Build the application
# We use a full Java 21 JDK image (based on Ubuntu 22.04 "Jammy") to build the app
FROM eclipse-temurin:21-jdk-jammy as builder
WORKDIR /app

# Copy the wrapper and pom.xml first to cache dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies (this layer is cached)
RUN ./mvnw dependency:go-offline

# Copy the source code and build the .jar file
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final, small runtime image
# We use a slim JRE (based on Ubuntu 22.04 "Jammy")
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built JAR from the 'builder' stage
# This name comes from your pom.xml, which is correct.
COPY --from=builder /app/target/portfolio-0.0.1-SNAPSHOT.jar ./app.jar

# This command will run when the container starts
ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT -jar app.jar"]
