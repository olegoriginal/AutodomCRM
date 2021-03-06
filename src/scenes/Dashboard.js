import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import autoparts from "../assets/Dashboard/autoparts.png"
import admin from "../assets/Dashboard/admin.png"
import boss from "../assets/Dashboard/boss.png"

const Dashboard = () => {
  toast.configure()
  const notify = (arg) => {
    toast.info(arg, { position: toast.POSITION.BOTTOM_RIGHT })
  }

  const auth = useSelector((s) => s.auth)
  console.log(auth.user.email)

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl py-4 border-b mb-6">Домашняя страница</h1>
        <div>
          <div className="w full md:flex flex-wrap rounded-lg shadow bg-white mb-5">
            <div className="w full px-4 py-2">
              <p>
                Вы вошли как: <b>{auth.user.email}</b>
              </p>
              {auth.roles.includes("admin") ? (
                <p>Вы администратор. У вас есть доступ ко всем страницам</p>
              ) : null}
              {auth.roles.includes("autopartfull") ||
              auth.roles.includes("autopartsimple") ? (
                <p>У вас есть доступ к странице "Автозапчасти"</p>
              ) : null}
              {auth.roles.includes("bookkeeper") ? (
                <p>У вас есть доступ к странице "Бухгалтерия"</p>
              ) : null}
            </div>
          </div>
          <div className="-mx-3 md:flex flex-wrap">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
              <div className="rounded-lg shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 h-full">
                <div className="m-2 p-2 flex flex-row">
                  <div className="w-1/2 px-3">
                    <h2 className="text-3xl text-white font-bold">
                      Автозапчасти
                    </h2>
                    <p className="my-2 text-white">
                      Возможность создавать, редактировать заказы по
                      автозпчастям
                    </p>
                    <Link to="/autoparts/order/list">
                      <button className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
                        Перейти
                      </button>
                    </Link>
                  </div>
                  <div className="w-1/2">
                    <img
                      src={autoparts}
                      alt=""
                      className="object-contain h-48 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col">
              <div className="rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-red-500 h-full">
                <div className="m-2 p-2 flex flex-row">
                  <div className="w-1/2 px-3">
                    <h2 className="text-3xl text-white font-bold">Админ</h2>
                    <p className="my-2 text-white">
                      Доступ ко всем настройкам. Добавление сотрудников,
                      клиентов, адресов и т.д.
                    </p>
                    {auth.roles.includes("admin") ? (
                      <Link to="/place/list">
                        <button className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
                          Перейти
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0"
                        onClick={() => notify("У вас нет доступа")}
                      >
                        Перейти
                      </button>
                    )}
                  </div>
                  <div className="w-1/2">
                    <img
                      src={admin}
                      alt=""
                      className="object-contain h-48 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 mb-6 mt-6 md:mb-0 flex flex-col">
              <div className="rounded-lg shadow-lg bg-gradient-to-r from-red-400 to-yellow-300 h-full">
                <div className="m-2 p-2 flex flex-row">
                  <div className="w-1/2 px-3">
                    <h2 className="text-3xl text-white font-bold">Босс</h2>
                    <p className="my-2 text-white">
                      Доступ к статистикам и отчетам
                    </p>
                    {auth.roles.includes("admin") ? (
                      <Link to="/boss">
                        <button className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0">
                          Перейти
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="bottom-0 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg lg:my-3 my-0"
                        onClick={() => notify("У вас нет доступа")}
                      >
                        Перейти
                      </button>
                    )}
                  </div>
                  <div className="w-1/2">
                    <img
                      src={boss}
                      alt=""
                      className="object-contain h-48 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
