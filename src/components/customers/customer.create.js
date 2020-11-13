import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import roleList from "../../lists/role-list"
import autopartsList from "../../lists/autoparts-list"

const CustomerCreate = (props) => {
  const list = useSelector((s) => s.places.list)

  const [inputFields, setInputFields] = useState([
    { addressItem: "", model: "" },
  ])
  const [state, setState] = useState({
    name: "",
    phone: "",
    mark: "",
    model: "",
    gen: "",
    mod: "",
  })

  const [options, setOptions] = useState({
    mark: [],
    model: [],
    gen: [],
    mod: [],
  })

  const [stateId, setStateId] = useState({
    mark: "",
    model: "",
    gen: "",
    mod: "",
  })

  useEffect(() => {
    fetch("/api/v1/carmark")
      .then((res) => res.json())
      .then((it) => {
        setOptions((prevState) => ({
          ...prevState,
          mark: it.data,
        }))
      })
    return () => {}
  }, [])

  useEffect(() => {
    fetch(`/api/v1/carmodel/${stateId.mark}`)
      .then((res) => res.json())
      .then((it) => {
        setOptions((prevState) => ({
          ...prevState,
          model: it.data,
        }))
      })
    return () => {}
  }, [stateId.mark])

  useEffect(() => {
    fetch(`/api/v1/cargen/${stateId.model}`)
      .then((res) => res.json())
      .then((it) => {
        setOptions((prevState) => ({
          ...prevState,
          gen: it.data,
        }))
      })
    return () => {}
  }, [stateId.model])

  useEffect(() => {
    fetch(`/api/v1/carmod/${stateId.model}`)
      .then((res) => res.json())
      .then((it) => {
        setOptions((prevState) => ({
          ...prevState,
          mod: it.data,
        }))
      })
    return () => {}
  }, [stateId.model])

  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const onChangeMark = (e) => {
    const { value } = e.target
    const findCar = options.mark
      ? options.mark.find((it) => value === it.name)
      : null
    setState((prevState) => ({
      ...prevState,
      mark: value,
      model: "",
      gen: "",
      mod: "",
    }))
    setStateId((prevState) => ({
      ...prevState,
      mark: findCar ? findCar.id_car_mark : "",
      model: "",
      gen: "",
      mod: "",
    }))
  }

  const onChangeModel = (e) => {
    const { value } = e.target
    const finModel = options.model.find((it) => value === it.name)
    setState((prevState) => ({
      ...prevState,
      model: value,
      gen: "",
      mod: "",
    }))
    setStateId((prevState) => ({
      ...prevState,
      model: finModel ? finModel.id_car_model : "",
      gen: "",
      mod: "",
    }))
  }

  const onChangeGen = (e) => {
    const { value } = e.target
    const findGen = options.gen.find((it) =>
      value === it.year_begin && it.year_end
        ? `${it.name} (${it.year_begin}-${it.year_end})`
        : it.name
    )
    setState((prevState) => ({
      ...prevState,
      gen: value,
      mod: "",
    }))
    setStateId((prevState) => ({
      ...prevState,
      gen: findGen ? findGen.id_car_generation : "",
      mod: "",
    }))
  }

  const onChangeMod = (e) => {
    const { value } = e.target
    setState((prevState) => ({
      ...prevState,
      mod: value,
    }))
  }
  const onChangeCustomerUppercase = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value.toUpperCase(),
    }))
  }

  const sendData = () => {
    if (!state) notify("Поле пустое")
    else {
      props.create(state)
      history.push("/customer/list")
      notify("Запись добавлена")
    }
  }

  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }

  const handleChangeInput = (index, event) => {
    const values = [...inputFields]
    values[index][event.target.name] = event.target.value
    setInputFields(values)
    setState((prevState) => ({
      ...prevState,
      preorder: inputFields,
    }))
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { addressItem: "" }])
    setState((prevState) => ({
      ...prevState,
      preorder: inputFields,
    }))
  }

  const handleRemoveFields = (index) => {
    if (index !== 0) {
      const values = [...inputFields]
      values.splice(index, 1)
      setInputFields(values)
      setState((prevState) => ({
        ...prevState,
        preorder: values,
      }))
    }
  }

  const history = useHistory()
  console.log(inputFields)
  return (
    <div>
      <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex flex-wrap">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
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
          <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Телефон
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.phone}
              name="phone"
              id="phone"
              placeholder="Введите телефон"
              required
              onChange={onChange}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex flex-wrap mt-3">
          <div className="md:w-full px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Выберите авто
            </label>
            {inputFields.map((inputField, index) => (
              <table className="border-collapse w-full mb-3">
                <thead>
                  <tr>
                    <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 table-cell w-full">
                      Авто {index + 1}
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 table-cell">
                      Строки
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    key={index}
                    className="bg-white mb-3 lg:hover:bg-gray-100 flex table-row flex-row lg:flex-row flex-wrap flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td className="w-full pt-3 flex flex-wrap lg:w-auto p-2 text-gray-800 text-center border border-b block relative static">
                      <input
                        className="appearance-none mb-3 block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4"
                        type="text"
                        placeholder="Например: свечи"
                        name="addressItem"
                        list="autoparts_list"
                        value={inputField.addressItem}
                        autoComplete="off"
                        onChange={(event) => handleChangeInput(index, event)}
                      />
                      <datalist id="autoparts_list">
                        {autopartsList.map((it) => (
                          <option value={it} />
                        ))}
                      </datalist>
                      <div className="md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Марка авто
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
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
                      <div className="md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Модель авто
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
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
                            {options.model.map((it) => (
                              <option value={it.name} label={it.name_rus} />
                            ))}
                          </datalist>
                        ) : null}
                      </div>
                      <div className="md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Год авто
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
                          value={state.gen}
                          name="gen"
                          id="gen"
                          list="gen_list"
                          placeholder={
                            state.model.length < 2
                              ? "Сначала выберете модель"
                              : "Выберите или введите год"
                          }
                          disabled={state.model.length < 2}
                          autocomplete="off"
                          required
                          onChange={onChangeGen}
                        />
                        <datalist id="gen_list">
                          {options.gen.map((it) => (
                            <option
                              value={
                                it.year_begin && it.year_end
                                  ? `${it.name} (${it.year_begin}-${it.year_end})`
                                  : it.name
                              }
                              label={it.name_rus}
                            />
                          ))}
                        </datalist>
                      </div>
                      <div className="md:w-1/4 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Объем двигателя
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
                          value={state.mod}
                          name="mod"
                          id="mod"
                          list="mod_list"
                          placeholder={
                            state.gen.length < 2
                              ? "Сначала выберете год"
                              : "Выберите или введите объем"
                          }
                          disabled={state.gen.length < 2}
                          autocomplete="off"
                          required
                          onChange={onChangeMod}
                        />
                        {stateId.gen ? (
                          <datalist id="mod_list">
                            {options.mod
                              .reduce((thing, current) => {
                                const x = thing.find(
                                  (item) => item.name === current.name
                                )
                                if (!x) {
                                  return thing.concat([current])
                                } else {
                                  return thing
                                }
                              }, [])
                              .sort(function (a, b) {
                                if (a.name > b.name) {
                                  return 1
                                }
                                if (a.name < b.name) {
                                  return -1
                                }
                                // a должно быть равным b
                                return 0
                              })
                              .map((it) => (
                                <option value={it.name} />
                              ))}
                          </datalist>
                        ) : null}
                      </div>
                      <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Гос. номер
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
                          value={state.regnumber}
                          name="regnumber"
                          placeholder="Введите гос. номер русскими буквами"
                          autocomplete="off"
                          required
                          onChange={onChangeCustomerUppercase}
                        />
                      </div>
                      <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
                        <label
                          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          VIN номер
                        </label>
                        <input
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4 mb-3"
                          value={state.vinnumber}
                          name="vinnumber"
                          id="vinnumber"
                          placeholder="Введите VIN"
                          autocomplete="off"
                          required
                          onChange={onChangeCustomerUppercase}
                        />
                      </div>
                    </td>
                    <td className="w-full lg:w-auto p-2 text-gray-800 text-center border border-b text-center flex flex-row table-cell relative static">
                      <button
                        onClick={() => handleRemoveFields(index)}
                        className="py-1 px-3 bg-red-500 text-white font-bold hover:bg-red-700 hover:text-white rounded-lg mr-1"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleAddFields()}
                        className="py-1 px-3 bg-blue-500 text-white font-bold hover:bg-blue-700 hover:text-white rounded-lg"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex my-2">
        <Link
          to="/customer/list"
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

export default CustomerCreate
