import Cookies from "universal-cookie"

import { history } from ".."

const UPDATE_LOGIN = "UPDATE_LOGIN"
const UPDATE_PASSWORD = "UPDATE_PASSWORD"
const LOGIN = "LOGIN"
const SHOW_MESSAGE = "SHOW_MESSAGE"
const KICK_USER = "KICK_USER"
const cookies = new Cookies()

const initialState = {
  email: "",
  password: "",
  token: cookies.get("token"),
  user: {},
  messages: [],
}

export default (state = initialState, action) => {
  if (action.type === "KICK_USER") {
    cookies.remove("token", { path: "/" })
  }
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }

    case SHOW_MESSAGE: {
      return { ...state, messages: [...state.messages, action.message] }
    }

    case LOGIN: {
      return { ...state, token: action.token, password: "", user: action.user }
    }

    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
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
    cookies.remove("token", { path: "/" })
    history.push("/login")
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch("/api/v1/auth")
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push("/place/list")
      })
  }
}

export function tryGetUserInfo() {
  return () => {
    try {
      fetch("/api/v1/user-info")
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => err)
    } catch (err) {
      console.log(err)
    }
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
        history.push("/place/list")
      })
  }
}
