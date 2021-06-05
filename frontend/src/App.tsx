import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  SURVEY_PATH,
  CREATE_ZING_PATH,
  EDIT_ZING_PATH,
} from '@core'

import { Home } from 'Home'
import { Login } from 'Login'
import { Signup } from 'Signup'
import { Survey } from 'Survey'
import { CreateZing } from 'CreateZing'
import { EditZing } from 'EditZing'

import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={LOGIN_PATH} component={Login} />
        <Route exact path={SIGNUP_PATH} component={Signup} />
        <Route exact path={SURVEY_PATH} component={Survey} />
        <Route exact path={CREATE_ZING_PATH} component={CreateZing} />
        <Route exact path={EDIT_ZING_PATH} component={EditZing} />
      </Switch>
    </Router>
  )
}

export default App
