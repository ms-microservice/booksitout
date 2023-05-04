package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BookIsbnService {

    private final BookIsbnRepository bookIsbnRepository;

    public BookIsbnDto getBookInfoByIsbn(int isbn) {
        BookIsbn bookIsbn = bookIsbnRepository.findByIsbn13(isbn)
                .orElseThrow(() -> new NotFoundException(""));

        return BookIsbnDto.of(bookIsbn);
    }

}