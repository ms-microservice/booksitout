import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

tasks.register("prepareKotlinBuildScriptModel") {}
plugins {
    kotlin("jvm") version "1.5.30"
    kotlin("plugin.spring") version "1.5.30"
}
java.sourceCompatibility = JavaVersion.VERSION_11

dependencies {
    // Spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    // DB
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("com.mysql:mysql-connector-j")

    // Spring Cloud
    implementation("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
    implementation("org.springframework.cloud:spring-cloud-starter-openfeign")
    implementation("org.springframework.cloud:spring-cloud-starter-config")
    implementation("org.springframework.cloud:spring-cloud-starter-sleuth")
    implementation("org.springframework.cloud:spring-cloud-starter-zipkin:2.2.8.RELEASE")

    // Kotlin
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
    testImplementation("io.projectreactor:reactor-test")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.+")

    // Apple Wallet DSK
    implementation("de.brendamour:jpasskit:0.3.3")

    // S3
    implementation(platform("software.amazon.awssdk:bom:2.19.1"))
    implementation("software.amazon.awssdk:s3-transfer-manager")

    // Mac M1 Compatability
    developmentOnly("io.netty:netty-resolver-dns-native-macos:4.1.75.Final") {
        artifact { classifier = "osx-aarch_64" }
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}