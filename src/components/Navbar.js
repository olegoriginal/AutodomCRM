import React, { useState } from "react"
import { Link } from "react-router-dom"
import cx from "classnames"
import { useDispatch } from "react-redux"
import { signOut } from "../redux/reducers/auth"

const Navbar = () => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const toggleOpen = () => {
    toggle === false ? setToggle(true) : setToggle(false)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white shadow px-6 py-3 z-20">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Autodom CRM
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-600 border-gray-600 hover:text-gray-800 hover:border-gray-800"
          onClick={toggleOpen}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={cx(
          "w-full block flex-grow lg:flex lg:items-center lg:w-auto",
          {
            hidden: toggle === false,
            block: toggle === true,
          }
        )}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/autoparts/order/list"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-blue-700 mr-4"
          >
            Заказы
          </Link>
          <Link
            to="/place/list"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-blue-700 mr-4"
          >
            Адреса
          </Link>
          <Link
            to="/admin"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-blue-700 mr-4"
          >
            Администратор
          </Link>
          <Link
            to="/employee/list"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-blue-700 mr-4"
          >
            Сотрудники
          </Link>
          <Link
            to="/customer/list"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-blue-700 mr-4"
          >
            Клиенты
          </Link>
        </div>
        <div>
          <button
            className="flex inline-block bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center md:mt-0 mt-4 "
            onClick={() => {
              dispatch(signOut())
            }}
          >
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              className="mb-auto mt-auto mr-1"
              viewBox="0 0 28 28"
            >
              <g>
                <path
                  d="M18.486,18.104c1.034-1.013,1.775-2.531,2.115-4.648c0.455,0.083,1.053-0.387,1.261-1.179
		c0.214-0.813,0.462-2.178-0.003-2.302c-0.137-0.037-0.279-0.009-0.422,0.063v-2.26c0.076-2.457-0.26-4.829-2.939-5.856
		C18.009,0.915,17.977,0,17.977,0c-1.206,1.086-5.785,1.526-5.785,1.526l0.052,0.014C6.438,2.137,7.276,4.224,7.276,7.777v2.26
		C7.134,9.965,6.992,9.936,6.854,9.974c-0.463,0.124-0.323,1.437-0.109,2.251c0.209,0.798,0.921,1.321,1.377,1.229
		c0.347,2.223,1.041,3.703,1.995,4.67c-4.443,1.625-7.604,5.728-7.604,10.543h23.641C26.152,23.827,22.962,19.71,18.486,18.104z"
                />
              </g>
            </svg>
            <div className="inline-block relative">
              <div className="inline-flex items-center">
                <span className="mr-1 font-normal text-sm">Выйти</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
