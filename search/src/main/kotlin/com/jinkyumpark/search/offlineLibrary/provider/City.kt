package com.jinkyumpark.search.offlineLibrary.provider

import com.jinkyumpark.search.offlineLibrary.provider.library.Library
import javax.persistence.*

@Entity
@Table(name = "CITY", uniqueConstraints = [
    UniqueConstraint(name = "name_unique", columnNames = ["koreanName", "englishName"])
])
class City {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var koreanName: String? = null
    var englishName: String? = null

    @ManyToOne @JoinColumn(name = "region_id", foreignKey = ForeignKey(name = "region_city_fk"))
    var region: Region? = null

    var dataLibraryApiCode: Int? = null
    var logo: String? = null

    @OneToMany(mappedBy = "city")
    lateinit var libraries: List<Library>
}
