import React from "react"
import { Switch, Route} from 'react-router-dom'
import App from './scenes/App'
import TaskDetails from "./scenes/Tasks.details"
import TaskList from './scenes/Tasks.list'
import Startup from './Startup'


function Routes() {
  return (
    <Startup>
      <div className="flex
      items-start justify-center min-h-screen w-screen p-2 md:p-5">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/list" component={TaskList} />
          <Route exact path="/details/:id" component={TaskDetails} />
        </Switch>
      </div>{" "}
    </Startup>
  )
}

export default Routes
