package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.user.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {
        "DEV_DB_ID=root",
        "DEV_DB_PW=bookitout",
        "DEV_MAIL_HOST=smtp.gmail.com",
        "DEV_MAIL_ID=jinpark1025@gmail.com",
        "DEV_MAIL_PORT=587",
        "DEV_MAIL_PW=hpugidddrpyqnpyn"
})
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class BookIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AppUserRepository appUserRepository;

/*
    private String jwtToken;

    @BeforeEach
    @WithUserDetails()
    void getJwtToken() throws Exception {
        Long appUserId = 1L;
        String email = "test@gmail.com";
        String password = "password";
        AppUser appUser = AppUser.builder()
                .appUserId(appUserId)
                .email(email)
                .password(password)
                .name("TEST")
                .build();
        appUserRepository.save(appUser);

        MvcResult result = mockMvc.perform(
                        post("/login")
                                .contentType("application/json")
                                .content(String.format("{\"email\": %s, \"password\": %s}", email, password))
                )
                .andReturn();

        String response = result.getResponse().getContentAsString();
        System.out.println(response);
    }
*/

    @Test
    @WithUserDetails(value = "test@gmail.com")
    void itShouldGetBookById() throws Exception {
        // Given
        Long bookId = 123L;
        Book book = Book.builder()
                .bookId(bookId)
                .title("")
                .author("")
                .endPage(100)
                .build();
        bookRepository.save(book);

        // When
        mockMvc.perform(
                get("/v1/book/{%d}", bookId)
        )
                .andExpect(status().isOk());
        // Then
    }
}
