package com.jinkyumpark.community.config.feign;

import com.jinkyumpark.community.config.feign.response.BookInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "bookIsbn", url = "${feign.url.core}")
public interface BookClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/book-isbn/{isbn}")
    BookInfo getBookInfoByIsbn(@PathVariable("isbn") long isbn);

    @RequestMapping(method = RequestMethod.POST, value = "v4/book-isbn/{isbn}")
    void addBookIsbnIfAbsent(@PathVariable("isbn") Long isbn);

}
