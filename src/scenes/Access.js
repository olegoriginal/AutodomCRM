import React from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import access from "../assets/access.png"

const Access = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl py-4 border-b mb-6">
          У вас нет доступа к этой странице
        </h1>
        <div className="flex justify-center">
          <img className="max-w-md" src={access} alt="" />
        </div>
        <div className="flex justify-center mt-5">
          <Link to="/">
            <button className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
              Вернуться назад
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Access
