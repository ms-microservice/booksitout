package com.jinkyumpark.search.offlineLibrary.model

import com.jinkyumpark.search.offlineLibrary.model.City
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
    var link: String? = null

    var webCrawlingCode: String? = null
}