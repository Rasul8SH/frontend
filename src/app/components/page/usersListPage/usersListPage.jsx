import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UsersTable from "../../ui/usersTable"
import _ from "lodash"
import { useUser } from "../../../hooks/useUser"
import { useProfessions } from "../../../hooks/useProfession"
import { useAuth } from "../../../hooks/useAuth"

const UsersListPage = () => {
  const pageSize = 8
  const { users } = useUser()
  const { currentUser } = useAuth()
  const { professions, isLoading: professionsLoading } = useProfessions()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleBookmark = (id) => {
    // setUsers(
    //   users.map((item) => {
    //     if (item._id === id) {
    //       item.bookmark = !item.bookmark
    //     }
    //     return item
    //   })
    // )
    console.log(id)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const handleProfessionSelect = (item) => {
    setSearchQuery("")
    setSelectedProf(item)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  const handleSearchQuery = ({ target }) => {
    setSelectedProf()
    setSearchQuery(target.value)
  }

  function filterUsers(data) {
    const filteredUsers = searchQuery
      ? data.filter((user) => (
        user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ))
      : selectedProf
        ? data.filter((user) => (
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        ))
        : data
    return filteredUsers.filter(u => u._id !== currentUser._id)
  }

  const filteredUsers = filterUsers(users)

  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <>
      <div className="d-flex ">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary m-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <SearchStatus users={count} />
          <input
            type="text"
            name="searchQuery"
            value={searchQuery}
            placeholder="Search..."
            onChange={handleSearchQuery}
          />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              selectedSort={sortBy}
              onBookmark={handleToggleBookmark}
              onSort={handleSort}
            />
          )}

          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default UsersListPage
