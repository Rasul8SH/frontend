import React from "react"
import PropTypes from "prop-types"
import Quality from "../quality"

const QualitiesCard = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column text-center">
        <h5 className="card-title">Qualities</h5>
        <p className="card-text"><Quality qualities={user.qualities} /></p>
      </div>
    </div>
  )
}

QualitiesCard.propTypes = {
  user: PropTypes.object
}

export default QualitiesCard
