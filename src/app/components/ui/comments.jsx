import React from "react"
import AddCommentForm from "./addCommentForm"
import PropTypes from "prop-types"
import CommentsList from "./comments/commentsList"
import { orderBy } from "lodash"
import { useComments } from "../../hooks/useComments"

const Comments = () => {
  const { createComment, comments, removeComment } = useComments()

  const handleSubmit = (data) => {
    createComment(data)
  }

  const handleRemoveComment = (id) => {
    removeComment(id)
  }

  const sortedComments = orderBy(comments, ["created_at"], ["desc"])

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {
        sortedComments.length > 0 &&
        <div className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      }
    </>
  )
}

Comments.propTypes = {
  pageId: PropTypes.string,
  updateComments: PropTypes.func
}

export default Comments
