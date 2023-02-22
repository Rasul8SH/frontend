import React from "react"
import PropTypes from "prop-types"
import Bookmark from "../common/bookmark"
import Quality from "./quality"
import Table from "../common/table"
import { Link } from "react-router-dom"
import Profession from "./profession"

const UsersTable = ({
  users,
  onBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: {
      name: "Имя",
      component: (user) => (
        <Link to={`/users/${user._id}`}>{user.name}</Link>
      )
    },
    qualities: {
      name: "Качества",
      component: (user) => (
        <Quality qualities={user.qualities} />
      )
    },
    professions: {
      name: "Профессия",
      component: (user) => (
        <Profession id={user.profession} />
      )
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user}
          onBookmark={onBookmark}
        />
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
