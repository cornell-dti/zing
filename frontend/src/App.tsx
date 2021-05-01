import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import {
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  SURVEY_PATH,
  CREATE_GROUP_PATH,
} from '@core'

import { Home } from 'Home'
import { Login } from 'Login'
import { Signup } from 'Signup'
import { Survey } from 'Survey'
import { CreateGroupForm } from '../src/modules/CreateGroup/Components/Form'
import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={LOGIN_PATH} component={Login} />
        <Route exact path={SIGNUP_PATH} component={Signup} />
        <Route exact path={SURVEY_PATH} component={Survey} />
        <Route exact path={CREATE_GROUP_PATH} component={CreateGroupForm} />
      </Switch>
    </Router>
  )
}

export default App
