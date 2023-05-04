package com.jinkyumpark.forum.feign;

import com.jinkyumpark.forum.feign.response.BookInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "bookIsbn", url = "http://localhost")
public interface BookClient {

    @RequestMapping(method = RequestMethod.GET, value = "v4/book-isbn/{isbn}")
    BookInfo getBookInfoByIsbn(@PathVariable("isbn") int isbn);

}
