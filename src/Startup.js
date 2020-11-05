import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasks } from "./redux/reducers/tasks"
import { getPlaces } from "./redux/reducers/places"
import { getEmployees } from "./redux/reducers/employees"
import { trySignIn, tryGetUserInfo } from "./redux/reducers/auth"
import PropTypes from "prop-types"

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      dispatch(tryGetUserInfo())
    }
  }, [])

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

Startup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Startup
