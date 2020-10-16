import React, { useState } from "react"

const RowCreate = (props) => {
  const [name, setName] = useState("")

  const onChange = ({ target: { value } }) => {
    setName(value)
  }
  const sendData = () => {
    props.create(name)
    setName("")
  }

  return (
    <div className="py-3 w-full flex md:flex-row flex-col  justify-between px-5 shadow-xl my-2">
      <input
        className="border-2 p-2 border-gray-400 border-solid"
        value={name}
        onChange={onChange}
      />
      <button
        className="py-3 bg-green-200 justify-center items-center rounded-sm flex md:flex-row flex-col px-5 shadow-xl my-2"
        onClick={sendData}
        disabled={name.length === 0}
      >
        {" "}
        Create{" "}
      </button>
    </div>
  )
}

export default RowCreate
