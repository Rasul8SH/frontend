import React, { useState } from "react"
import PropTypes from "prop-types"
import { validator } from "../../utils/validator"
import TextareaField from "../common/form/textareaField"

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Введите сообщение, чтобы отправить"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit({ ...data })
    clearForm()
  }

  return (
    <>
      <h2>New Comment</h2>
      <form onSubmit={handleSubmit}>
        <TextareaField
          label="Сообщение"
          name="content"
          value={data.content || ""}
          onChange={handleChange}
          error={errors.content}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary mx-auto"
        >
          Опубликовать
        </button>
      </form>
    </>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
