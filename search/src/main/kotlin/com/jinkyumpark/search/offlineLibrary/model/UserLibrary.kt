package com.jinkyumpark.search.offlineLibrary.model

import com.jinkyumpark.search.offlineLibrary.model.Library
import javax.persistence.*

@Entity
@Table(
    uniqueConstraints = [
        UniqueConstraint(name = "user_library_unique", columnNames = ["library_id", "appUserId"])
    ]
)
class UserLibrary {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne @JoinColumn(name = "library_id", foreignKey = ForeignKey(name = "library_user_fk"))
    var library: Library? = null
    var appUserId: Long? = null
}