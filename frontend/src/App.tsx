import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { HOME_PATH, SURVEY_PATH } from '@core'

import { Home } from 'Home'
import { Survey } from 'Survey'
import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={SURVEY_PATH} component={Survey} />
      </Switch>
    </Router>
  )
}

export default App
