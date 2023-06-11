package com.jinkyumpark.core.batch.bookFindIsbn.steps;

import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.common.feign.SearchClient;
import com.jinkyumpark.core.common.feign.response.NewBookSearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class BookFindIsbnProcessor implements ItemProcessor<Book, Book> {

    private final SearchClient searchClient;

    @Transactional
    @Override
    public Book process(Book bookWithoutIsbn) {
        log.info("Finding book with title : {}", bookWithoutIsbn.getTitle());

        try { Thread.sleep(200); }
        catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        String query = bookWithoutIsbn.getTitle() + " " + bookWithoutIsbn.getAuthor();
        List<NewBookSearchResponse> searchResult = searchClient.getNewBookSearchResultFromNaver(query);

        if (searchResult.isEmpty()) {
            return bookWithoutIsbn;
        }

        return bookWithoutIsbn.addIsbn(searchResult.get(0).getIsbn());
    }

}
