import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import CustomerRow from "../../components/customers/customer"
import { deleteCustomer } from "../../redux/reducers/customers"
import Navbar from "../../components/Navbar"
import Modal from "../../components/Modal.delete"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CustomerList = () => {
  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }
  const dispatch = useDispatch()
  const list = useSelector((s) => s.customers.list)
  const place = useSelector((s) => s.places.list)
  const [isOpen, setIsOpen] = useState(false)
  const [itemId, setItemId] = useState("")

  const openAndDelete = (id) => {
    setIsOpen(true)
    setItemId(id)
  }
  const deleteCustomerLocal = (id) => {
    dispatch(deleteCustomer(id))
    setIsOpen(false)
    notify("Клиент удален")
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl py-4 border-b mb-6">Список клиентов</h1>
        <div className="overflow-x-auto rounded-lg overflow-y-auto relative lg:my-3 mt-1 lg:shadow">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Имя
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Телефон
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Авто
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((it, id) => (
                <CustomerRow
                  key={id}
                  place={place}
                  deleteCustomer={openAndDelete}
                  {...it}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/customer/create">
          <button className="py-2 w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
            Добавить нового клиента
          </button>
        </Link>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => deleteCustomerLocal(itemId)}
      />
    </div>
  )
}

export default CustomerList
