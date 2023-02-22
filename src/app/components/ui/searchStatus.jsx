import React from "react"
import PropTypes from "prop-types"

const SearchStatus = ({ users }) => {
  return (
    <h2>
      <span className={"badge text-bg-" + (users > 0 ? "primary" : "danger")}>
        {users > 0
          ? `${users} человек тусанёт с тобой сегодня`
          : `Никто с тобой не тусанёт`
        }
      </span>
    </h2>
  )
}

SearchStatus.propTypes = {
  users: PropTypes.number.isRequired
}

export default SearchStatus
