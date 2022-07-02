FROM openjdk:11
ARG JAR_FILE=build/libs//*.jar
COPY ${JAR_FILE} pollseb-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "pollseb-0.0.1-SNAPSHOT.jar"]
EXPOSE 5000
#ENV spring.datasource.url= jdbc:mysql://127.0.0.1:3306/polling_seb?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false




