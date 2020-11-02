import React, { useState, useRef, useEffect } from "react"
import "./autocomplete/style.css"
import Autocomplete from "./autocomplete"
import CarMarkList from "../lists/car_mark"
import cx from "classnames"
import Navbar from "../components/Navbar"

const AutocompletePage = () => {
  const list = ["Coder", "artist", "bmw", "Lada"]
  const [filter, setFilter] = useState({ mark: "" })
  const [dropdown, setDropdown] = useState(false)
  const onChange = (e) => {
    const { name, value } = e.target
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  console.log(filter)
  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl py-4 border-b mb-6">Поиск по авто</h1>
          <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="-mx-3 relative inline-block text-left w-1/3">
              <div>
                <span className="rounded-md shadow-sm">
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
                    value={filter.mark}
                    onChange={onChange}
                    name="mark"
                    id="mark"
                    onClick={() => setDropdown(true)}
                    onBlur={() => setDropdown(false)}
                    placeholder="Введите значение"
                  />
                </span>
              </div>

              <div
                className={cx(
                  "origin-top-right absolute right-0 w-full rounded-md shadow-lg",
                  {
                    hidden: dropdown === false,
                    block: dropdown === true,
                  }
                )}
              >
                <div className="rounded-md bg-white shadow-xs">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {list.map((name) => {
                      if (filter.mark !== 0) {
                        if (
                          name.toLowerCase().includes(filter.mark.toLowerCase())
                        ) {
                          return (
                            <li
                              onClick={(e) => setFilter(e.target.name)}
                              name="lol"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            >
                              {name}
                            </li>
                          )
                        } else {
                          return null
                        }
                      }
                      return (
                        <li
                          onClick={(e) => setFilter(e.target.value.name)}
                          name="lol"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        >
                          {name}
                        </li>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AutocompletePage
