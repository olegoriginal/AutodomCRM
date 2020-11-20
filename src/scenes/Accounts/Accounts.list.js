import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import AccountRow from "../../components/accounts/account"
import { deleteAccount } from "../../redux/reducers/accounts"
import Navbar from "../../components/Navbar"
import Modal from "../../components/Modal.delete"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import roleList from "../../lists/account-role-list"

const AccountList = () => {
  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }
  const dispatch = useDispatch()
  const list = useSelector((s) => s.accounts.list)
  const [isOpen, setIsOpen] = useState(false)
  const [itemId, setItemId] = useState("")

  const openAndDelete = (id) => {
    setIsOpen(true)
    setItemId(id)
  }
  const deleteAccountLocal = (id) => {
    dispatch(deleteAccount(id))
    setIsOpen(false)
    notify("Адрес удален")
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl py-4 border-b mb-6">Список аккаунтов</h1>
        <div className="overflow-x-auto rounded-lg overflow-y-auto relative lg:my-3 mt-1 lg:shadow">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Логин
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Пароль
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Должность
                </th>
                <th className="p-3 font-bold uppercase bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((it, id) => (
                <AccountRow
                  key={id}
                  place={roleList}
                  deleteAccount={openAndDelete}
                  {...it}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/account/create">
          <button className="py-2 w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
            Добавить новый аккаунт
          </button>
        </Link>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => deleteAccountLocal(itemId)}
      />
    </div>
  )
}

export default AccountList
