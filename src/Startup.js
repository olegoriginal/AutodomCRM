import {useEffect}  from "react"
import { useDispatch } from "react-redux"
import {getTasks} from './redux/reducers/tasks'

const Startup = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return props.children
}

export default Startup
