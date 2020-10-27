import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getTasks } from "./redux/reducers/tasks"
import { getPlaces } from "./redux/reducers/places"

const Startup = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPlaces())
  }, [dispatch])

  return props.children
}

export default Startup
