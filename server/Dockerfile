FROM eclipse-temurin:24-jdk-alpine

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Garantindo que o mvnw seja executável
RUN chmod +x mvnw

# Instalando dependências
RUN ./mvnw dependency:go-offline

COPY src ./src

# Compilando a aplicação
RUN ./mvnw package -DskipTests

# Configurando o comando para executar o jar
ENTRYPOINT ["java", "-jar", "/app/target/bonsai-ecommerce-backend-0.0.1-SNAPSHOT.jar"]
