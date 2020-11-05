import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import tasks from "./tasks"
import places from "./places"
import employees from "./employees"
import auth from "./auth"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    places,
    employees,
    auth,
  })
