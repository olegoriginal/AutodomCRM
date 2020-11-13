import React from "react"
import { Switch, Route } from "react-router-dom"
import App from "./scenes/App"
import Admin from "./scenes/Admin"
import TaskDetails from "./scenes/Tasks.details"
import AutopartsOrderList from "./scenes/Autoparts.order.list"
import AutopartsOrderCreate from "./scenes/Autoparts.order.create"
import PlaceList from "./scenes/Places/Places.list"
import PlaceNew from "./scenes/Places/Places.create"
import PlaceEdit from "./scenes/Places/Places.edit"
import EmployeeList from "./scenes/Employees/Employees.list"
import EmployeeNew from "./scenes/Employees/Employees.create"
import EmployeeEdit from "./scenes/Employees/Employees.edit"
// import Test from "./components/test-checkbox"
import Startup from "./Startup"

function Routes() {
  return (
    <Startup>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/admin" component={Admin} />
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
          <Route exact path="/place/edit/:id" component={PlaceEdit} />
          <Route exact path="/employee/list" component={EmployeeList} />
          <Route exact path="/employee/create" component={EmployeeNew} />
          <Route exact path="/employee/edit/:id" component={EmployeeEdit} />
        </Switch>
      </div>{" "}
    </Startup>
  )
}

export default Routes
