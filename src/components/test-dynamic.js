import React, { useState } from "react"
import AsyncSelect from "react-select"
import { useSelector } from "react-redux"

function Test() {
  const [search, setSearch] = useState()

  const handleSelectChange = (event) => {
    setSearch({
      result: event.target.value,
    })
  }
  console.log(search)
  return (
    <div className="App">
      <select onChange={handleSelectChange}>
        <option value="1">Blah</option>
        <option value="2">Blah2</option>
        <option value="3">Blah3</option>
      </select>
    </div>
  )
}

export default Test
