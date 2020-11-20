import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import Modal from "../Modal.delete"
import "react-toastify/dist/ReactToastify.css"
import roleList from "../../lists/account-role-list"

const AccountUpdate = (props) => {
  const [isOpen, SetIsOpen] = useState(false)
  const removeAccount = (e) => {
    props.deleteAccount(props.id, e.target.value)
    history.push("/account/list")
    notify("Аккаунт удален")
  }
  const changeAccount = () => {
    if (!state) notify("Поле пустое")
    else {
      props.updateAccount(props.id, state)
      history.push("/account/list")
      notify("Данные изменены")
    }
  }
  const [state, setState] = useState({
    email: props.email,
    role: props.role,
  })
  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkboxChange = (e) => {
    const { name, checked } = e.target
    if (checked) {
      setState((prevState) => ({
        ...prevState,
        role: [...prevState.role, name],
      }))
    } else {
      setState((prevState) => ({
        ...prevState,
        role: prevState.role.filter((it) => it !== name),
      }))
    }
  }

  const history = useHistory()

  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }
  return (
    <div>
      <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex flex-wrap">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Логин
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.email}
              name="email"
              id="email"
              placeholder="Введите логин"
              required
              onChange={onChange}
            />
          </div>
          <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Пароль
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              name="password"
              id="password"
              disabled
              placeholder="Вы не можете менять пароль. Если забыли пароль создайте новый аккаунт"
              required
            />
          </div>
        </div>
        <div className="-mx-3 md:flex flex-wrap mt-3">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Выберите место работы
            </label>
            {roleList.map((it, index) => (
              <div key={index} className="mb-2">
                <label>
                  <input
                    className="mr-2"
                    checked={state.role.index}
                    key={it.id}
                    name={it.value}
                    defaultChecked={props.role.find(
                      (item) => item === it.value
                    )}
                    onChange={checkboxChange}
                    type="checkbox"
                  />
                  {it.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex my-2">
        <Link
          to="/account/list"
          className="my-3 mr-2 py-2 w-1/3 px-3 bg-green-600 text-white text-center hover:bg-green-700 hover:text-white rounded-lg"
        >
          Отмена
        </Link>
        <button
          className="my-3 mr-2 py-2 w-1/3 px-3 bg-red-600 text-white text-center hover:bg-red-700 hover:text-white rounded-lg"
          onClick={() => SetIsOpen(true)}
        >
          Удалить
        </button>
        <button
          className="my-3 ml-2 py-2 w-2/3 px-3 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg"
          onClick={changeAccount}
        >
          Сохранить
        </button>
      </div>
      <Modal
        open={isOpen}
        onClose={() => SetIsOpen(false)}
        onSubmit={removeAccount}
      />
    </div>
  )
}

export default AccountUpdate