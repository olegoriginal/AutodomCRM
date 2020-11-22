import Cookies from "universal-cookie"
import { history } from ".."

const UPDATE_LOGIN = "UPDATE_LOGIN"
const UPDATE_PASSWORD = "UPDATE_PASSWORD"
const KICK_USER = "KICK_USER"
const LOGIN = "LOGIN"

const cookies = new Cookies()

const initialState = {
  email: "",
  password: "",
  token: cookies.get("token"),
  user: {},
  roles: [],
  place: "",
  name: "",
}

export default (state = initialState, action) => {
  if (action.type === "KICK_USER") {
    cookies.remove("token", { path: "/" })
  }
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        password: "",
        user: action.user,
        roles: action.user.role,
        place: action.user.address,
        name: action.user.name,
      }
    }
    default:
      return state
  }
}

export function updateLoginField(email) {
  return { type: UPDATE_LOGIN, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}
export function signOut() {
  return (dispatch) => {
    dispatch({ type: KICK_USER })
    history.push("/login")
  }
}

export function signIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    fetch("/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push(
          data.user.role.includes("autopart")
            ? "/autoparts/order/list"
            : "/admin"
        )
      })
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch("/api/v1/auth")
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user,
          roles: data.user.role,
          place: data.user.address,
          name: data.user.name,
        })
        // history.push("/account/list")
      })
  }
}
