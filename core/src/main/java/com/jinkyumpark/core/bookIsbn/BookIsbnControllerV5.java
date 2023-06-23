package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.core.common.PageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/book-isbn")
public class BookIsbnControllerV5 {

    private final BookIsbnService bookIsbnService;

    @GetMapping
    public List<BookIsbnDto> getBookIsbnByQuery(@RequestParam("query") String query,
                                                @RequestParam(value = "page", required = false) Integer page,
                                                @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = PageUtils.pageableSortedDesc(page, size, "publicationYear");
        List<BookIsbn> bookIsbnList = bookIsbnService.getBookIsbnByQuery(query, pageable);

        return bookIsbnList.stream()
                .map(BookIsbnDto::of)
                .collect(Collectors.toList());
    }

}
