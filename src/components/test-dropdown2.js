import React, { useEffect, useState, useRef } from "react"
import markList from "../lists/car_mark"
import modelList from "../lists/car_model"

const Auto = (props) => {
  const [display, setDisplay] = useState(false)
  const [options, setOptions] = useState(props.list)
  const [search, setSearch] = useState({ mark: "" })
  const wrapperRef = useRef(null)
  console.log(search)

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  const updatePokeDex = (poke) => {
    setSearch({ mark: poke })
    setDisplay(false)
  }
  return (
    <div>
      <div ref={wrapperRef} className="relative inline-block text-left">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-3 px-4 mb-3"
          placeholder="Type to search"
          value={search.mark}
          onChange={(event) => setSearch({ mark: event.target.value })}
        />
        {display && (
          <div className="origin-top-right absolute left-0 mt-1 w-full rounded-md z-50 dropdown">
            <div className="rounded-md bg-white shadow-xs flex flex-col">
              {options
                .filter(
                  ({ name, name_rus }) =>
                    name.toLowerCase().includes(search.mark.toLowerCase()) ||
                    name_rus.toLowerCase().includes(search.mark.toLowerCase())
                )
                .map((value, i) => {
                  return (
                    <div
                      onClick={() => updatePokeDex(value.name)}
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      key={i}
                      tabIndex="0"
                    >
                      <span>{value.name}</span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto id="lol" list={markList} name="mark" />
        <Auto id="lol" list={modelList} name="model" disabled />
      </div>
    </div>
  )
}

export default App
