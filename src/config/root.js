import React from "react"
import PropTypes from "prop-types"
import { Provider, useSelector } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { Switch, Route, Redirect, StaticRouter } from "react-router-dom"

import store, { history } from "../redux"
// import Beer from "../components/beer"

import Home from "../components/login"
import PrivateComponent from "../components/private-route"
import NotFound from "../components/404"
// import Game from "../components/game"
// import Chat from "../components/chat"
import Admin from "../scenes/Admin"
import TaskDetails from "../scenes/Tasks.details"
import AutopartsOrderList from "../scenes/Autoparts.order.list"
import AutopartsOrderCreate from "../scenes/Autoparts.order.create"
import PlaceList from "../scenes/Places/Places.list"
import PlaceNew from "../scenes/Places/Places.create"
import PlaceEdit from "../scenes/Places/Places.edit"
import EmployeeList from "../scenes/Employees/Employees.list"
import EmployeeNew from "../scenes/Employees/Employees.create"
import EmployeeEdit from "../scenes/Employees/Employees.edit"
import Tested from "../components/test-dropdown"

import Startup from "../Startup"

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)

  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Redirect to={{ pathname: "/private" }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token && auth.roles.includes("admin") ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  token: PropTypes.string,
}

const defaults = {
  location: {
    pathname: "",
  },
  user: null,
  token: "",
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== "undefined" ? (
    <ConnectedRouter {...props} />
  ) : (
    <StaticRouter {...props} />
  )

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector
        history={history}
        location={props.location}
        context={props.context}
      >
        <Startup>
          <Switch>
            <OnlyAnonymousRoute
              exact
              path="/login"
              component={() => <Home />}
            />
            <Route exact path="/" component={() => <PlaceList />} />
            {/* <Route exact path="/game" component={() => <Game />} />
            <Route exact path="/beer" component={() => <Beer />} />

            <PrivateRoute exact path="/chat" component={() => <Chat />} /> */}
            <Route exact path="/dashboard" component={() => <Home />} />

            <AdminRoute
              exact
              path="/admin"
              component={() => <PrivateComponent />}
            />
            <PrivateRoute
              exact
              path="/place/list"
              component={() => <PlaceList />}
            />
            <PrivateRoute
              exact
              path="/private"
              component={() => <PrivateComponent />}
            />
            {/* <Route component={() => <NotFound />} /> */}
            <AdminRoute exact path="/admin" component={Admin} />
            <PrivateRoute
              exact
              path="/autoparts/order/list"
              component={AutopartsOrderList}
            />
            <PrivateRoute
              exact
              path="/autoparts/order/create"
              component={AutopartsOrderCreate}
            />
            <PrivateRoute exact path="/details/:id" component={TaskDetails} />
            <PrivateRoute exact path="/place/list" component={PlaceList} />
            <PrivateRoute exact path="/place/create" component={PlaceNew} />
            <PrivateRoute exact path="/place/edit/:id" component={PlaceEdit} />
            <PrivateRoute
              exact
              path="/employee/list"
              component={EmployeeList}
            />
            <PrivateRoute
              exact
              path="/employee/create"
              component={EmployeeNew}
            />
            <PrivateRoute
              exact
              path="/employee/edit/:id"
              component={EmployeeEdit}
            />
            <PrivateRoute exact path="/test" component={Tested} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
