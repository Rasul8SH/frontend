import React from "react"
import PropTypes from "prop-types"

const Bookmark = ({ status, onBookmark }) => {
  return (
    <button onClick={() => onBookmark(status._id)}>
      <i className={
        "bi bi-bookmark" + (status.bookmark ? "-check-fill" : "")
      }></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.object,
  onBookmark: PropTypes.func
}

export default Bookmark
