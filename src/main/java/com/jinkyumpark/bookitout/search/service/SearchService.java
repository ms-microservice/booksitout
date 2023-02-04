package com.jinkyumpark.bookitout.search.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.parser.Parser;

import java.io.IOException;

public class SearchService {

    static Document getJsoupDocument(String url) {
        Document document = null;
        try {
            document = Jsoup.connect(url).parser(Parser.htmlParser()).get();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return document;
    }

}
