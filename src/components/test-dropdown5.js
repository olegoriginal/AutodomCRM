import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import markList from "../lists/car_mark"
// import modelList from "../lists/car_model"

const EmployeeCreate = (props) => {
  const [options, setOptions] = useState({ mark: markList })
  const [state, setState] = useState({
    mark: "",
    model: "",
    role: "",
    address: [],
  })
  const [stateId, setStateId] = useState({
    mark: "",
    model: "",
    role: "",
    address: [],
  })
  const bla = "bmw"
  const onChangeMark = (e) => {
    const { name, value } = e.target
    const findCar = options.mark.find((it) => value === it.name)
    setState((prevState) => ({
      ...prevState,
      mark: value,
      model: "",
    }))
    setStateId((prevState) => ({
      ...prevState,
      mark: findCar,
      model: "",
    }))
  }

  const onChangeModel = (e) => {
    const { name, value } = e.target
    const findCar = options.mark.find((it) => value === it.name)
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setStateId((prevState) => ({
      ...prevState,
      [name]: findCar,
    }))
  }

  const sendData = () => {
    if (!state) notify("Поле пустое")
    else {
      props.create(state)
      history.push("/employee/list")
      notify("Запись добавлена")
    }
  }

  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }
  console.log(stateId)
  const history = useHistory()
  return (
    <div>
      <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex flex-wrap">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Марка авто
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.mark}
              name="mark"
              list="mark_list"
              placeholder="Введите бренд"
              autocomplete="off"
              required
              onChange={onChangeMark}
            />
            <datalist id="mark_list">
              {options.mark.map((it) => (
                <option
                  value={it.name}
                  label={it.name_rus}
                  key={it.id_car_mark}
                />
              ))}
            </datalist>
          </div>
          {/* <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Модель авто
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.model}
              name="model"
              id="model"
              list="model_list"
              placeholder={
                state.mark.length < 2
                  ? "Сначала выберете марку"
                  : "Выберите модель"
              }
              disabled={state.mark.length < 2}
              autocomplete="off"
              required
              onChange={onChangeModel}
            />
            {stateId.mark ? (
              <datalist id="model_list">
                {modelList
                  .filter((it) => it.id_car_mark === stateId.mark.id_car_mark)
                  .map((it) => (
                    <option value={it.name} label={it.name_rus} />
                  ))}
              </datalist>
            ) : null}
          </div> */}
        </div>
      </div>
      <div className=" flex my-2">
        <Link
          to="/employee/list"
          className="my-3 mr-2 py-2 md:w-1/3 px-3 bg-red-600 text-white text-center hover:bg-red-700 hover:text-white rounded-lg"
        >
          Отмена
        </Link>

        <button
          className="my-3 ml-2 py-2 md:w-2/3 px-3 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg"
          onClick={sendData}
          type="submit"
        >
          Создать
        </button>
      </div>
    </div>
  )
}

export default EmployeeCreate
