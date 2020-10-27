import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import tasks from "./tasks"
import places from "./places"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    places,
  })
