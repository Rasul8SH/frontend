import React from "react"
import PropTypes from "prop-types"
import { useQuality } from "../../hooks/useQuality"

const Quality = ({ qualities }) => {
  const { isLoading, getQuality } = useQuality()

  return (
    !isLoading
      ? qualities.map((qStr) => {
        const qual = getQuality(qStr)
        return (
          <span key={qual._id} className={"me-2 badge text-bg-" + qual.color}>
            {qual.name}
          </span>
        )
      })
      : "loading..."
  )
}

Quality.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
}

export default Quality
