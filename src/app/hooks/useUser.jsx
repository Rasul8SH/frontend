import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import userService from "../services/user.service"
import { toast } from "react-toastify"
import { useAuth } from "./useAuth"

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users]
      const indexUser = newUsers.findIndex(u => u._id === currentUser._id)
      newUsers[indexUser] = currentUser
      setUsers(newUsers)
    }
  }, [currentUser])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getUsers = async () => {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  function getUserById(id) {
    return users.find(u => u._id === id)
  }

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default UserProvider
