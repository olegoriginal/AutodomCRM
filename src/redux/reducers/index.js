import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import tasks from "./tasks"
import places from "./places"
import employees from "./employees"
import auth from "./auth"
import autoparts from "./autoparts"
import customers from "./customers"
import accounts from "./accounts"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    tasks,
    places,
    employees,
    autoparts,
    customers,
    accounts,
  })
