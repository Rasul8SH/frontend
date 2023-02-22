import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"
import { useQuality } from "../../hooks/useQuality"
import { useProfessions } from "../../hooks/useProfession"
import { useAuth } from "../../hooks/useAuth"
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const { signUp } = useAuth()
  const [errors, setErrors] = useState({})
  const { professions } = useProfessions()
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const { qualities } = useQuality()
  const qualitiesList = qualities.map(q => ({
    label: q.name,
    value: q._id
  }))

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна к заполнению"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно к заполнению"
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен к заполнению"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Пожалуйста, выберите свою профессию"
      }
    },
    licence: {
      isRequired: {
        message: "Чтобы использовать сервис, подтвердите лицензионное соглашение"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = {
      ...data,
      qualities: data.qualities.map(q => q.value)
    }
    try {
      await signUp(newData)
      history.push("/")
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Электронная почта"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Пароль"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <SelectField
          label="Профессия"
          name="profession"
          value={data.profession}
          onChange={handleChange}
          error={errors.profession}
          options={professionsList}
          defaultOption="Выберите профессию"
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" }
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
          label="Выберите пол"
        />
        <MultiSelectField
          options={qualitiesList}
          onChange={handleChange}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите качества"
        />
        <CheckBoxField
          name="licence"
          value={data.licence}
          onChange={handleChange}
          error={errors.licence}
        >
          Подтвердить <a>лицензионное соглашение</a>
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default RegisterForm
