import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { HOME_PATH, SURVEY_PATH, EDIT_ZING_PATH, DASHBOARD_PATH } from '@core'
import { PublicRoute, PrivateRoute } from '@core/Components'
import { checkAuth, initializeFirebase } from '@fire'
import { useAppDispatch } from '@redux/hooks'
import { User, saveLogin } from '@redux/authSlice'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { Home } from 'Home'
import { Survey } from 'Survey'
import { EditZing } from 'EditZing'
import { Dashboard } from 'Dashboard'

import './App.css'
import { CssBaseline } from '@mui/material'
import theme from '@core/Constants/Theme'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    initializeFirebase()
    checkAuth((userData: User) => {
      dispatch(saveLogin(userData))
    })
  }, [dispatch])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <PublicRoute exact path={HOME_PATH} component={Home} />
            {/* Anyone should be able to access the survey, signed in or not */}
            <Route exact path={`${SURVEY_PATH}/:courseId`} component={Survey} />
            <PrivateRoute exact path={EDIT_ZING_PATH} component={EditZing} />
            <PrivateRoute exact path={DASHBOARD_PATH} component={Dashboard} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
