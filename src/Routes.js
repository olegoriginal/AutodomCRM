import React from "react"
import { Switch, Route } from "react-router-dom"
import App from "./scenes/App"
import TaskDetails from "./scenes/Tasks.details"
import AutopartsOrderList from "./scenes/Autoparts.order.list"
import AutopartsOrderCreate from "./scenes/Autoparts.order.create"
import PlaceList from "./scenes/Places.list"
import PlaceNew from "./scenes/Places.create"
import Startup from "./Startup"
import Planets from "./lists/place-list"

function Routes() {
  return (
    <Startup>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            exact
            path="/autoparts/order/list"
            component={AutopartsOrderList}
          />
          <Route
            exact
            path="/autoparts/order/create"
            component={AutopartsOrderCreate}
          />
          <Route exact path="/details/:id" component={TaskDetails} />
          <Route exact path="/place/list" component={PlaceList} />
          <Route exact path="/place/create" component={PlaceNew} />
        </Switch>
      </div>{" "}
    </Startup>
  )
}

export default Routes
