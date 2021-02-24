import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { HOME_PATH } from '@core'

import { Home } from 'Home'
import './App.css'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={HOME_PATH} component={Home} />
            </Switch>
        </Router>
    )
}

export default App
