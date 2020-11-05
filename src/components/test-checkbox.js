import React, { useState, useRef, useEffect } from "react"
import "./autocomplete/style.css"
import Autocomplete from "./autocomplete"
import CarMarkList from "../lists/car_mark"
import CarModelList from "../lists/car_model"
import cx from "classnames"
import Navbar from "../components/Navbar"
import useOnClickOutside from "./common/useOnClickOutside"

const AutocompletePage = () => {
  const list = ["Coder", "artist", "bmw", "Lada"]
  const [filter, setFilter] = useState({ mark: "", model: "" })
  const [filterId, setFilterId] = useState({ mark: "", model: "" })
  const [dropdown, setDropdown] = useState({ mark: false, model: false })
  const onChange = (e) => {
    const { name, value } = e.target
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const dropdownShow = (e) => {
    const { name } = e.target
    setDropdown((prevState) => ({
      ...prevState,
      [name]: true,
    }))
  }
  const dropdownClick = (e) => {
    const { id, innerText } = e.target
    setFilter((prevState) => ({
      ...prevState,
      [id]: innerText,
    }))
    setDropdown((prevState) => ({
      ...prevState,
      [id]: false,
    }))
  }
  const wrapperRef = useOnClickOutside(() => {
    setDropdown(() => ({
      model: false,
      mark: false,
    }))
  })
  console.log(dropdown)
  return (
    <>
      <div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl py-4 border-b mb-6">Car search</h1>
          <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="-mx-3 md:flex mb-6">
              <div
                className="relative inline-block md:w-1/3 px-3 mb-6 md:mb-0"
                ref={wrapperRef}
              >
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Модель авто
                </label>
                <div id="mark">
                  <span className="rounded-md shadow-sm">
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
                      value={filter.mark}
                      onChange={onChange}
                      name="mark"
                      id="mark"
                      autocomplete="off"
                      onClick={dropdownShow}
                      placeholder="Выберите модель"
                    />
                  </span>

                  <div
                    className={cx(
                      "origin-top-right pl-3 absolute right-0 w-full rounded-md dropdown overflow-y-auto",
                      {
                        hidden: dropdown.mark === false,
                        block: dropdown.mark === true,
                      }
                    )}
                  >
                    <div className="rounded-md bg-white shadow-lg">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                        name="mark"
                      >
                        {CarMarkList.map((car) => {
                          if (filter.mark !== 0) {
                            if (
                              car.name
                                .toLowerCase()
                                .includes(filter.mark.toLowerCase()) ||
                              car.name_rus
                                .toLowerCase()
                                .includes(filter.mark.toLowerCase())
                            ) {
                              return (
                                <div
                                  data="mark"
                                  onClick={dropdownClick}
                                  id="mark"
                                  value={filter.mark}
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                >
                                  {car.name}
                                </div>
                              )
                            } else {
                              return null
                            }
                          }
                          return null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative inline-block md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Модель авто
                </label>
                <div ref={wrapperRef} id="model">
                  <span className="rounded-md shadow-sm">
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
                      value={filter.model}
                      onChange={onChange}
                      name="model"
                      id="model"
                      autocomplete="off"
                      onClick={dropdownShow}
                      placeholder="Выберите модель"
                    />
                  </span>

                  <div
                    className={cx(
                      "origin-top-right pl-3 absolute right-0 w-full rounded-md dropdown overflow-y-auto",
                      {
                        hidden: dropdown.model === false,
                        block: dropdown.model === true,
                      }
                    )}
                  >
                    <div className="rounded-md bg-white shadow-lg">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                        name="model"
                      >
                        {CarMarkList.map((car) => {
                          if (filter.model !== 0) {
                            if (
                              car.name
                                .toLowerCase()
                                .includes(filter.model.toLowerCase()) ||
                              car.name_rus
                                .toLowerCase()
                                .includes(filter.model.toLowerCase())
                            ) {
                              return (
                                <div
                                  data="model"
                                  onClick={dropdownClick}
                                  id="model"
                                  value={filter.model}
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                >
                                  {car.name}
                                </div>
                              )
                            } else {
                              return null
                            }
                          }
                          return null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>
            {filter.mark}
            {filter.model}
          </p>
        </div>
      </div>
    </>
  )
}

export default AutocompletePage
