package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.core.common.feign.NewBookSearchResponse;
import com.jinkyumpark.core.common.feign.SearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookIsbnService {

    private final BookIsbnRepository bookIsbnRepository;
    private final SearchClient searchClient;

    public BookIsbnDto getBookInfoByIsbn(Long isbn) {
        BookIsbn bookIsbn = bookIsbnRepository.findByIsbn13(isbn)
                .orElseThrow(() -> new NoContentException("찾으시려는 책이 없어요"));

        return BookIsbnDto.of(bookIsbn);
    }

    public BookIsbn addBookIsbnIfAbsent(Long isbn) {
        Optional<BookIsbn> bookIsbnOptional = bookIsbnRepository.findByIsbn13(isbn);

        if (bookIsbnOptional.isPresent()) return bookIsbnOptional.get();

        List<NewBookSearchResponse> searchResult = searchClient.getNewBookSearchResultFromNaver(isbn.toString());
        Optional<NewBookSearchResponse> firstResult = searchResult.stream()
                .filter(b -> b.getIsbn().equals(isbn.toString()))
                .findFirst();

        if (firstResult.isEmpty()) return null;

        BookIsbn bookIsbn = BookIsbn.of(firstResult.get());

        return bookIsbnRepository.save(bookIsbn);
    }

}