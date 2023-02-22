import React, { useState, useEffect } from "react"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { useHistory } from "react-router-dom"
import BackHistoryButton from "../../common/backHistoryButton"
import { useProfessions } from "../../../hooks/useProfession"
import { useQuality } from "../../../hooks/useQuality"
import { useAuth } from "../../../hooks/useAuth"

const EditUserPage = () => {
  const history = useHistory()
  const { professions, isLoading: professionLoading } = useProfessions()
  const { qualities, getQuality, isLoading: qualityLoading } = useQuality()
  const [isLoading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const { currentUser, updateUserData } = useAuth()
  const [data, setData] = useState()

  useEffect(() => {
    if (!professionLoading && !qualityLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      })
    }
  }, [professionLoading, qualityLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false)
    }
  }, [data])

  const transformData = (data) =>
    data.map((qual) => ({
      label: getQuality(qual).name,
      value: getQuality(qual)._id
    }))

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна к заполнению"
      },
      isEmail: {
        message: "Email введен не корректно"
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
    await updateUserData({
      ...data,
      qualities: data.qualities.map(q => q.value)
    })
    history.push(`/users/${currentUser._id}`)
  }

  return (
    <>
      <div className="container mt-5">
        <BackHistoryButton />
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">

            {!isLoading
              ? (<form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Профессия"
                  name="profession"
                  value={data.profession}
                  onChange={handleChange}
                  error={errors.profession}
                  options={professions}
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
                  options={qualities}
                  onChange={handleChange}
                  defaultValue={data.qualities}
                  name="qualities"
                  label="Выберите качества"
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Обновить
                </button>
              </form>)
              : ("Loading...")
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserPage
