import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

const PlaceCreate = (props) => {
  const [state, setState] = useState("")

  const [error, setError] = useState("")

  const onChange = ({ target: { value } }) => {
    setState(value)
  }

  const history = useHistory()

  const sendData = () => {
    if (!state) setError("Поле пустое")
    else {
      props.create(state)
      setError("")
      history.push("/place/list")
    }
  }

  return (
    <form className="container flex flex-wrap">
      <div className="flex flex-row w-full">
        <div className="flex flex-col mx-2">
          <label htmlFor="address">Введите адрес</label>
          <input
            className="border-2 p-2 border-gray-400 border-solid"
            value={state}
            name="address"
            id="address"
            required
            onChange={onChange}
          />
        </div>
      </div>

      <Link to="/place/list">
        <button className="py-3 bg-red-200 justify-center items-center rounded-sm flex md:flex-row flex-col px-5 shadow-xl my-2">
          Назад
        </button>
      </Link>
      <button
        className="py-3 bg-green-200 justify-center items-center rounded-sm flex md:flex-row flex-col px-5 shadow-xl my-2"
        onClick={sendData}
        type="submit"
      >
        Добавить
      </button>
      <p>{error}</p>
    </form>
  )
}

export default PlaceCreate
