import React, { useState, useRef, useEffect } from "react"

// import "./App.css"

const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props
  const ulRef = useRef()
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation()
      ulRef.current.style.display = "flex"
      onInputChange(event)
    })
    document.addEventListener("click", (event) => {
      ulRef.current.style.display = "none"
    })
  }, [])
  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          )
        })}
      </ul>
    </div>
  )
}

const defaultOptions = []
for (let i = 0; i < 10; i++) {
  defaultOptions.push(`car ${i}`)
}

const optionsSecond = ["model1", "model2", "model3"]

function Tested() {
  const [car, setCar] = useState([])
  const [model, setModel] = useState([])
  const [common, setCommon] = useState()
  const onInputCarChange = (event) => {
    setCar(
      defaultOptions.filter((option) => option.includes(event.target.value))
    )
    setCommon(event.target.value)
  }
  const onInputModelChange = (event) => {
    setModel(
      optionsSecond.filter((option) => option.includes(event.target.value))
    )
  }
  console.log(common)
  return (
    <div className="App container mt-2 mb-3">
      <h1>Search Bar Dropdown</h1>
      <h4>Car</h4>
      <SearchbarDropdown options={car} onInputChange={onInputCarChange} />
      <h4>Model</h4>
      <SearchbarDropdown options={model} onInputChange={onInputModelChange} />
      <br />
      <button className="btn btn-primary">Search</button>
    </div>
  )
}

export default Tested
