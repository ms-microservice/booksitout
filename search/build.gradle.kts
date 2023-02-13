import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

tasks.register("prepareKotlinBuildScriptModel") {}

plugins {
    kotlin("jvm") version "1.5.30"
    kotlin("plugin.spring") version "1.5.30"
}

java.sourceCompatibility = JavaVersion.VERSION_17

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
    testImplementation("io.projectreactor:reactor-test")

    // Web Crawling
    implementation("org.jsoup:jsoup:1.15.3")
    implementation("org.seleniumhq.selenium:selenium-java:4.0.0")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.+")

    implementation(project(":core"))
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
