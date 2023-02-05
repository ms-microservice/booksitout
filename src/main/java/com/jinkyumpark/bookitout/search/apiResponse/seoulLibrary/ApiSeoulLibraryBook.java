package com.jinkyumpark.bookitout.search.apiResponse.seoulLibrary;

import com.jinkyumpark.bookitout.search.provider.OnlineLibraryProvider;
import com.jinkyumpark.bookitout.search.response.searchResult.OnlineLibrarySearchResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class ApiSeoulLibraryBook {
    private String contentsKey;
    private String title;
    private String author;
    private String publisher;
    private String publishDate;
    private String contentsType;
    private String contentsTypeDesc;
    private String loanCnt;
    private String ownerCode;
    private String coverUrl;
    private String coverMSizeUrl;
    private String coverSSizeUrl;
    private String contentsInfo;
    private String recommendCnt;
    private String reserveCnt;
    private String reviewRate;
    private String likeYn;
    private String isbn;
    private Integer currentLoanCount;
    private Integer currentResvCount;
    private Integer reviewCount;
    private Integer likeCount;
    private Double avgrate;

    public OnlineLibrarySearchResult toOnlineLibrarySearchResult() {
        return OnlineLibrarySearchResult.builder()
                .title(title)
                .author(author)
                .cover(coverUrl)
                .link(String.format("https://elib.seoul.go.kr/contents/detail.do?no=%s", contentsKey))
                .loanPossible(currentLoanCount < 5)
                .reservationPossible(currentResvCount < 5)
                .provider(OnlineLibraryProvider.SEOUL_LIBRARY)
                .build();
    }
}
