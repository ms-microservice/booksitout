package com.jinkyumpark.search.offlineLibrary.library

import com.jinkyumpark.search.offlineLibrary.location.City
import javax.persistence.*

@Entity
@Table(
    name = "LIBRARY",
    uniqueConstraints = [
        UniqueConstraint(name = "name_unique", columnNames = ["koreanName", "englishName"])
    ]
)
class Library {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var englishName: String? = null
    var koreanName: String? = null

    @ManyToOne @JoinColumn(name = "city_id", foreignKey = ForeignKey(name = "city_library_fk"))
    var city: City? = null

    var address: String? = null
    var postCode: String? = null
    var latitude: Double? = null
    var longitude: Double? = null

    var link: String? = null
    var phone: String? = null

    var totalBookCount: Int? = null

    var webCrawlingCode: String? = null

    @Enumerated(EnumType.STRING)
    var libraryType: LibraryType? = null
}