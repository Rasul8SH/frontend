import React from "react"
import PropTypes from "prop-types"

const SelectField = ({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const optionsArray = !Array.isArray(options) && typeof (options) === "object"
    ? Object.keys(options).map(option => ({
      name: options[option].name,
      _id: options[option]._id
    }))
    : options

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map(option => (
            <option
              key={option._id}
              value={option._id}
            >
              {option.name}
            </option>
          ))
        }
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.defaultProps = {
  defaultOption: "Choose..."
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField
