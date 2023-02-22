import React from "react"
import PropTypes from "prop-types"

const TextareaField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={getInputClasses()}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextareaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextareaField
