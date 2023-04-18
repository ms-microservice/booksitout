package com.jinkyumpark.search.offlineLibrary.provider

import javax.persistence.*

@Entity
@Table(
    name = "REGION",
    uniqueConstraints = [
        UniqueConstraint(name = "name_unique", columnNames = ["koreanName", "englishName"])
    ]
)
class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Enumerated(EnumType.STRING) var country: Country? = null
    var koreanName: String? = null
    var englishName: String? = null

    @Column(nullable = true) var logo: String? = null
    var dataLibraryApiCode: Int? = null

    @OneToMany(mappedBy = "region")
    lateinit var cities: List<City>
}

enum class Country {
    KOREA
}