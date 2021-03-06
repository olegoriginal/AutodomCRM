import React from "react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav className="left-0 top-0 bg-gray-800 font-semibold w-40 h-screen text-white flex flex-col pt-3">
      <NavLink
        to="/place/list"
        className="text-gray-100 w-full p-3 pl-5"
        activeClassName="bg-gray-700 text-gray-100 border-r-4 border-gray-100 w-full p-3 pl-5"
      >
        Адреса
      </NavLink>
      <NavLink
        to="/account/list"
        className="text-gray-100 w-full p-3 pl-5"
        activeClassName="bg-gray-700 text-gray-100 border-r-4 border-gray-100 w-full p-3 pl-5"
      >
        Аккаунты
      </NavLink>
      <NavLink
        to="/employee/list"
        className="text-gray-100 w-full p-3 pl-5"
        activeClassName="bg-gray-700 text-gray-100 border-r-4 border-gray-100 w-full p-3 pl-5"
      >
        Сотрудники
      </NavLink>
    </nav>
  )
}

export default Sidebar
