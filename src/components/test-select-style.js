import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import Select from "react-select"
import "react-toastify/dist/ReactToastify.css"
import roleList from "../../lists/role-list"

const EmployeeCreate = (props) => {
  const [state, setState] = useState({
    name: "",
    surname: "",
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const [selectState, setSelectState] = useState({
    role: null,
    address: null,
  })

  const selectChange = (e) => {}

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

  const history = useHistory()

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      maxHeight: 50,
      minHeight: 50,
    }),
    valueContainer: (styles) => ({ ...styles, padding: 0, paddingLeft: 14 }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      marginBottom: 7,
      marginTop: 7,
    }),
  }

  return (
    <div>
      <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex flex-wrap">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Имя
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.name}
              name="name"
              id="name"
              placeholder="Введите имя"
              required
              onChange={onChange}
            />
          </div>
          <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Фамилия
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.surname}
              name="surname"
              id="surname"
              placeholder="Введите фамилию"
              required
              onChange={onChange}
            />
          </div>
          <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Должность
            </label>
            <Select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded p-0 mb-3"
              styles={selectStyle}
              value={selectState.role}
              name="role"
              id="role"
              placeholder="Выберите должность"
              options={roleList}
              onChange={selectChange}
            />
            <Select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded p-0 mb-3"
              styles={selectStyle}
              value={selectState.address}
              name="address"
              id="address"
              placeholder="Выберите адрес"
              options={roleList}
              onChange={selectChange}
            />
          </div>
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
