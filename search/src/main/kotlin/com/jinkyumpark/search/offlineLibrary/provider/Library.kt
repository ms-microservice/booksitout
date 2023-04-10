package com.jinkyumpark.search.offlineLibrary.provider

enum class Library(
    val apiCode: String,
    val city: City,
    val displayName: String,
    val location: String,
    val postCode: String,
    val link: String?,
) {

    DAERIM("CA", City.YEONGDEUNGPOGU, "대림도서관", "", "", ""),
    MULLAE("CB", City.YEONGDEUNGPOGU, "문래도서관", "", "", ""),
    SEONYU("CC", City.YEONGDEUNGPOGU, "선유도서관", "서울시 영등포구 선유로 43가길 10-8", "07210", "https://www.ydplib.or.kr/sylib/index.do"),
    YEOUISAETGANG("MA", City.YEONGDEUNGPOGU, "여의샛강도서관", "", "", ""),
    YEONGDEUNGPOSAENGGAKGONGJANG("LX", City.YEONGDEUNGPOGU, "영등포생각공장도서관", "", "", ""),
    BAMDONGSAN("LW", City.YEONGDEUNGPOGU, "밤동산작은도서관", "", "", ""),
    DANGSAN1DONG("LF", City.YEONGDEUNGPOGU, "당산1동 작은도서관", "", "", ""),
    DANGSAN2DONG("LLG", City.YEONGDEUNGPOGU, "당산2동 작은도서관", "", "", ""),
    DAERIM1DONG("LR", City.YEONGDEUNGPOGU, "대림1동 작은도서관", "", "", ""),
    DAERIM2DONG("LS", City.YEONGDEUNGPOGU, "대림2동 작은도서관", "", "", ""),
    DAERIM3DONG("LT", City.YEONGDEUNGPOGU, "대림3동 작은도서관", "", "", ""),
    DORIMDONG("LH", City.YEONGDEUNGPOGU, "도림동 작은도서관", "", "", ""),
    MOKWAMAEUL("LU", City.YEONGDEUNGPOGU, "목화마을 작은도서관", "", "", ""),
    MULLAEDONG("LI", City.YEONGDEUNGPOGU, "문래동 작은도서관", "", "", ""),
    SINGIL1DONG("LL", City.YEONGDEUNGPOGU, "신길1동 작은도서관", "", "", ""),
    Cheongsonyeonmunhwauijip("LC", City.YEONGDEUNGPOGU, "청소년문화의집 작은도서관", "", "", ""),
    SAENGGANGNAMU("LM", City.YEONGDEUNGPOGU, "생각나무 작은도서관", "", "", ""),
    드나드리("LN", City.YEONGDEUNGPOGU, "드나드리 작은도서관", "", "", ""),
    꿈터("LO", City.YEONGDEUNGPOGU, "꿈터 작은도서관", "", "", ""),
    신길6동("LP", City.YEONGDEUNGPOGU, "신길6동 작은도서관", "", "", ""),
    마음서랍("LQ", City.YEONGDEUNGPOGU, "마음서랍 작은도서관", "", "", ""),
    양평1동("LJ", City.YEONGDEUNGPOGU, "양평1동 작은도서관", "", "", ""),
    양평2동("LK", City.YEONGDEUNGPOGU, "양평2동 작은도서관", "", "", ""),
    여의동("LE", City.YEONGDEUNGPOGU, "여의동 작은도서관", "", "", ""),
    구민회관("LA", City.YEONGDEUNGPOGU, "구민회관 작은도서관", "", "", ""),
    영등포동("LD", City.YEONGDEUNGPOGU, "영등포동 작은도서관", "", "", ""),
    영등포본동("LB", City.YEONGDEUNGPOGU, "영등포본동 작은도서관", "", "", ""),
    늘샘드리("LV", City.YEONGDEUNGPOGU, "늘샘드리 작은도서관", "", "", ""),
    영등포스마트도서관("CD", City.YEONGDEUNGPOGU, "영등포스마트도서관", "", "", "");

    companion object {
        fun fromDisplayNameContains(displayName: String): Library {
            return enumValues<Library>()
                .first { it.displayName.contains(displayName) }
        }
    }
}