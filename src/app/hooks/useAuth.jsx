import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import userService from "../services/user.service"
import { toast } from "react-toastify"
import localStorageService, { setTokens } from "../services/localStorage.service"
import { useHistory } from "react-router-dom"

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data)
      console.log(content)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(
        `accounts:signUp`,
        {
          email,
          password,
          returnSecureToken: true
        })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "???????????????????????? ?? ?????????? email ?????? ????????????????????"
          }
          throw errorObject
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(
        `accounts:signInWithPassword`,
        {
          email,
          password,
          returnSecureToken: true
        })
      setTokens(data)
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email ?????? ???????????? ?????????????? ??????????????????????")
          default:
            throw new Error("?????????????? ?????????? ?????????????? ??????????. ???????????????????? ??????????")
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData()
    setUser(null)
    history.push("/")
  }

  async function updateUserData(data) {
    try {
      const { content } = await userService.update(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, logOut, updateUserData, currentUser }}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default AuthProvider
