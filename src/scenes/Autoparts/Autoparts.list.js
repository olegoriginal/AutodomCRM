import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import AutopartsRow from "../../components/autoparts/autoparts.row"
import RowCreate from "../../components/tasks/row.create"
import { createAutopart, updateStatus } from "../../redux/reducers/autoparts"
import Navbar from "../../components/Navbar"
import Modal from "../../components/Modal.delete"

const AutopartsList = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.autoparts.list)
  const create = (name) => {
    dispatch(createAutopart(name))
  }
  const updateStatusLocal = (id, status) => {
    dispatch(updateStatus(id, status))
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4">
        <div className="overflow-x-auto rounded-lg overflow-y-auto relative lg:my-3 mt-1 lg:shadow">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  №
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Клиент
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Заказ
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Авто
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Телефон
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Принял
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Точка
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Обработал
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Статус
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Дата
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {list
                .map((it) => (
                  <AutopartsRow
                    key={it.id}
                    {...it}
                    updateStatus={updateStatusLocal}
                  />
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
        <Link to="/autoparts/order/create">
          <button className="py-2 w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
            Добавить новый заказ
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AutopartsList
