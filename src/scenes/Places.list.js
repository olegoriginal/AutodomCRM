import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import PlaceRow from "../components/tasks/place"
import { updatePlace } from "../redux/reducers/places"
import Navbar from "../components/Navbar"

const PlaceList = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.places.list)
  const updateStatusLocal = (id, status) => {
    dispatch(updatePlace(id, status))
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl py-4 border-b mb-6">Список адресов</h1>
        <div className="overflow-x-auto rounded-lg shadow overflow-y-auto relative my-3 md:bg-gray-300 sm:bg-gray-300">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 w-full font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Точка
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((it) => (
                <PlaceRow key={it.id} {...it} updatePlace={updateStatusLocal} />
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/place/create">
          <button className="my-3 py-2 w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg">
            Добавить новый адрес
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PlaceList
