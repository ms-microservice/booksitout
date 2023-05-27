package com.jinkyumpark.library.location.kakaoMapApi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class ApiKakaoMapConvertResponse {

    private ApiKakaoMapResponseMeta meta;
    private List<ApiKakaoMapResponseDocument> documents;

    public String getShortAddress() {
        if (documents.isEmpty()) return "";

        ApiKakaoMapResponseDocument document = documents.get(0);
        String[] addressDetailSplit = document.getRegion_2depth_name().split(" ");

        return document.getRegion_1depth_name() + " " + addressDetailSplit[0];
    }

    public String getLongAddress() {
        if (documents.isEmpty()) return "";

        return documents.get(0).getAddress_name();
    }

}

