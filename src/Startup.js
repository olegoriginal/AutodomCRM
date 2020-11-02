import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getTasks } from "./redux/reducers/tasks"
import { getPlaces } from "./redux/reducers/places"
import { getEmployees } from "./redux/reducers/employees"

const Startup = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPlaces())
  }, [dispatch])

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  return props.children
}

export default Startup
