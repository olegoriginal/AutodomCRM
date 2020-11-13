import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import modelList from "../lists/car_model"

const EmployeeCreate = (props) => {
  const [options, setOptions] = useState({
    mark: [],
    model: [],
    gen: [],
    mod: [],
  })
  const [state, setState] = useState({
    mark: "",
    model: "",
    gen: "",
    mod: "",
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

  console.log(options)
  console.log(stateId)
  const onChangeMark = (e) => {
    const { value } = e.target
    const findCar = options.mark
      ? options.mark.find((it) => value === it.name)
      : null
    setState((prevState) => ({
      ...prevState,
      mark: value,
      model: [],
      gen: [],
      mod: [],
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
      gen: [],
      serie: [],
      mod: [],
    }))
    setStateId((prevState) => ({
      ...prevState,
      model: finModel ? finModel.id_car_model : "",
      gen: "",
      serie: "",
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
    console.log(findGen)
    setState((prevState) => ({
      ...prevState,
      gen: value,
      serie: [],
      mod: [],
    }))
    setStateId((prevState) => ({
      ...prevState,
      gen: findGen ? findGen.id_car_generation : "",
      serie: "",
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
  // console.log(options)
  const history = useHistory()
  return (
    <div>
      <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex flex-wrap">
          <div className="md:w-1/5 px-3 mb-6 md:mb-0 flex flex-col">
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

          <div className="md:w-1/5 px-3 mb-6 md:mb-0 flex flex-col">
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
                {options.model.map((it) => (
                  <option value={it.name} label={it.name_rus} />
                ))}
              </datalist>
            ) : null}
          </div>

          <div className="md:w-1/5 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Поколение авто
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.gen}
              name="gen"
              id="gen"
              list="gen_list"
              placeholder={
                state.model.length < 2
                  ? "Сначала выберете модель"
                  : "Выберите поколение"
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
          <div className="md:w-1/5 px-3 mb-6 md:mb-0 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Модификация авто
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
              value={state.mod}
              name="mod"
              id="mod"
              list="mod_list"
              placeholder={
                state.gen.length < 2
                  ? "Сначала выберете поколение"
                  : "Выберите модификацию"
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
                    const x = thing.find((item) => item.name === current.name)
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
