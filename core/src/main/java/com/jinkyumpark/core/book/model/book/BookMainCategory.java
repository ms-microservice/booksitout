package com.jinkyumpark.core.book.model.book;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BookMainCategory {

    OTHERS
    ("000"),
    PHILOSOPHY
    ("100"),
    RELIGION
    ("200"),
    SOCIAL_SCIENCE
    ("300"),
    NATURAL_SCIENCE
    ("400"),
    TECHNOLOGY
    ("500"),
    ART
    ("600"),
    LANGUAGE
    ("700"),
    LITERATURE
    ("800"),
    HISTORY
    ("900"),
    UNKNOWN
    (""),
    ;

    private final String number;

    public static BookMainCategory getByStartsWith(String number) {
        switch (Integer.parseInt(number)) {
            case 0: return BookMainCategory.OTHERS;
            case 1: return BookMainCategory.PHILOSOPHY;
            case 2: return BookMainCategory.RELIGION;
            case 3: return BookMainCategory.SOCIAL_SCIENCE;
            case 4: return BookMainCategory.NATURAL_SCIENCE;
            case 5: return BookMainCategory.TECHNOLOGY;
            case 6: return BookMainCategory.ART;
            case 7: return BookMainCategory.LANGUAGE;
            case 8: return BookMainCategory.LITERATURE;
            case 9: return BookMainCategory.HISTORY;
            default: return BookMainCategory.UNKNOWN;
        }
    }

}
