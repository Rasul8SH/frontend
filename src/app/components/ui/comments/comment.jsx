import React from "react"
import PropTypes from "prop-types"
import { displayDate } from "../../../utils/displayDate"
import { useUser } from "../../../hooks/useUser"
import { useAuth } from "../../../hooks/useAuth"

const Comment = ({
  _id: id,
  created_at: created,
  userId,
  content,
  onRemove
}) => {
  const { getUserById } = useUser()
  const user = getUserById(userId)
  const { currentUser } = useAuth()

  return (
    <div className="card-body bg-light mb-3">
      <div className="d-flex">
        <img
          src={user.image}
          className="rounded-circle shadow-1-strong me-3"
          alt="avatar"
          width="65"
          height="65"
        />
        <div className="flex-grow-1 flex-shrink-1 mb-4">
          <div className="d-flex justify-content-between">
            <p className="mb-1">
              {user && user.name}{" "}
              <span className="small">
                - {displayDate(created)}
              </span>
            </p>
            {userId === currentUser._id &&
              <button
                className="btn btn-sm text-primary"
                onClick={() => onRemove(id)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            }
          </div>
          <p className="small mb-0">{content}</p>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  content: PropTypes.string,
  userId: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  _id: PropTypes.string,
  onRemove: PropTypes.func
}

export default Comment
