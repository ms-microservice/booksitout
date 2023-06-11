package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.core.common.feign.response.NewBookSearchResponse;
import com.jinkyumpark.core.common.feign.SearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookIsbnService {

    private final BookIsbnRepository bookIsbnRepository;
    private final BookIsbnQueryDslRepository bookIsbnQueryDslRepository;
    private final SearchClient searchClient;

    public BookIsbnDto getBookInfoByIsbn(String isbn) {
        BookIsbn bookIsbn = bookIsbnRepository.findByIsbn(String.valueOf(isbn))
                .orElseThrow(() -> new NoContentException("찾으시려는 책이 없어요"));

        return BookIsbnDto.of(bookIsbn);
    }

    public BookIsbn addBookIsbnIfAbsent(String isbn) {
        Optional<BookIsbn> bookIsbnOptional = bookIsbnRepository.findByIsbn(String.valueOf(isbn));

        if (bookIsbnOptional.isPresent()) return bookIsbnOptional.get();

        List<NewBookSearchResponse> searchResult = searchClient.getNewBookSearchResultFromNaver(isbn);
        Optional<NewBookSearchResponse> firstResult = searchResult.stream()
                .filter(b -> b.getIsbn().equals(isbn))
                .findFirst();

        if (firstResult.isEmpty()) return null;

        return bookIsbnRepository.save(firstResult.get().toEntity());
    }

    public BookIsbn getBookInfoAddIfAbsent(String isbn) {
        Optional<BookIsbn> book = bookIsbnRepository.findByIsbn(isbn);

        if (book.isEmpty()) {
            BookIsbn bookIsbn = searchClient.getBookDetailByIsbnFromData4library(isbn).toEntity();
            return bookIsbnRepository.save(bookIsbn);
        }

        return book.get();
    }

    public List<BookIsbn> getBookIsbnByQuery(String query, Pageable pageable) {
        return bookIsbnQueryDslRepository.getBookIsbnByQuery(query, pageable);
    }

}