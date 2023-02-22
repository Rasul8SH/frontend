import React from "react"
import PropTypes from "prop-types"
import UserInfoCard from "../../ui/cards/userInfoCard"
import QualitiesCard from "../../ui/cards/qualitiesCard"
import MeetingsCard from "../../ui/cards/meetingsCard"
import Comments from "../../ui/comments"
import { useUser } from "../../../hooks/useUser"
import CommentsProvider from "../../../hooks/useComments"

const User = ({ userId }) => {
  const { getUserById } = useUser()
  const user = getUserById(userId)

  return (
    user
      ? (
        <div className="container">
          <div className="row gutters-sm">

            <div className="col-md-4 mb-3">
              <UserInfoCard user={user} />
              <QualitiesCard user={user} />
              <MeetingsCard user={user} />
            </div>

            <div className="col-md-8">
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
            </div>

          </div>
        </div>)
      : ("Loading...")
  )
}

User.propTypes = {
  userId: PropTypes.string
}

export default User
