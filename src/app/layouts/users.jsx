import React from "react"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/usersListPage"
import { useParams, Redirect } from "react-router-dom"
import EditUserPage from "../components/page/editUserPage/editUserPage"
import UserProvider from "../hooks/useUser"
import { useAuth } from "../hooks/useAuth"

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const { currentUser } = useAuth()

  return (
    <UserProvider>
      {userId
        ? edit
          ? (userId === currentUser._id ? <EditUserPage /> : <Redirect to={`/users/${currentUser._id}/edit`} />)
          : <UserPage userId={userId} />
        : <UsersListPage />
      }
    </UserProvider>
  )
}

export default Users
