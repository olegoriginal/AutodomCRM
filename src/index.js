import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store, { history } from "./redux"
import { ConnectedRouter } from "connected-react-router"
import "./index.css"
import "./styles/main.css"

// import Routes from "./Routes"
import RootComponent from "./config/root"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <Routes /> */}
        <RootComponent />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
