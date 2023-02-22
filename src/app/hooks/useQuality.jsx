import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import qualityService from "../services/quality.service"
import { toast } from "react-toastify"

const QualityContext = React.createContext()

export const useQuality = () => useContext(QualityContext)

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getQuality = (id) => qualities.find(q => q._id === id)

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
