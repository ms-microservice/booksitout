package com.jinkyumpark.search.offlineLibrary.libraryUser

import com.jinkyumpark.search.offlineLibrary.library.Library
import javax.persistence.*

@Entity
@Table(
    uniqueConstraints = [
        UniqueConstraint(name = "user_library_unique", columnNames = ["library_id", "appUserId"])
    ]
)
class LibraryUser(id: Long?, appUserId: Long?) {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = id
    var appUserId: Long? = appUserId

    @ManyToOne @JoinColumn(name = "library_id", foreignKey = ForeignKey(name = "library_user_fk"))
    var library: Library? = null

    constructor() : this(null, null) {}
}