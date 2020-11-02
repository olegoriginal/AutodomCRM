import React, { useState } from "react"
import AsyncSelect from "react-select"
import { useSelector } from "react-redux"

function Test() {
  const [inputFields, setInputFields] = useState([{ addressItem: "" }])
  const handleChangeInput = (index, event) => {
    const values = [...inputFields]
    values[index][event.target.name] = event.target.value
    setInputFields(values)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { addressItem: "" }])
  }

  const handleRemoveFields = (index) => {
    if (index !== 0) {
      const values = [...inputFields]
      values.splice(index, 1)
      setInputFields(values)
    }
  }
  return (
    <div className="-mx-3 md:flex mb-2">
      <div className="md:w-full px-3 mb-6 md:mb-0">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 table-cell w-full">
                Место работы
              </th>
              <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 table-cell">
                Строки
              </th>
            </tr>
          </thead>
          <tbody>
            {inputFields.map((inputField, index) => (
              <tr
                key={index}
                className="bg-white lg:hover:bg-gray-100 flex table-row flex-row lg:flex-row flex-wrap flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-2 text-gray-800 text-center border border-b block table-cell relative static">
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 focus:border-gray-500 focus:outline-none rounded py-1 px-4"
                    type="text"
                    placeholder="Например: свечи"
                    name="addressItem"
                    value={inputField.addressItem}
                    onChange={(event) => handleChangeInput(index, event)}
                  />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Test
