import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { HOME_PATH, SURVEY_PATH, CREATE_ZING_PATH, EDIT_ZING_PATH } from '@core'

import { Home } from 'Home'
import { Survey } from 'Survey'
import { CreateZingForm } from 'CreateZing'
import { Dashboard } from 'EditZing'

import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={SURVEY_PATH} component={Survey} />
        <Route exact path={CREATE_ZING_PATH} component={CreateZingForm} />
        <Route exact path={EDIT_ZING_PATH} component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
