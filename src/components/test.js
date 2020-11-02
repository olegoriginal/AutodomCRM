import React, { useState } from "react"
import Select from "react-select"
import { useSelector } from "react-redux"

function Test() {
  const [inputValue, setValue] = useState("")
  const [selectedValue, setSelectedValue] = useState(null)

  // useSelector will make sure this component re-renders
  const list = useSelector((s) => s.places.list)

  const handleInputChange = (value) => {
    setValue(value)
  }

  const handleChange = (value) => {
    setSelectedValue(value)
  }

  return (
    <div className="App">
      <h3>React-Select Async Dropdown - </h3>
      <pre>Input Value: "{inputValue}"</pre>
      <Select
        cacheOptions
        defaultOptions
        options={list} // Since the list is provided by the store, provide it directly
        value={selectedValue}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
    </div>
  )
}

export default Test
