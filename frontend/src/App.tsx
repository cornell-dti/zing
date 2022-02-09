import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  HOME_PATH,
  SURVEY_PATH,
  EDIT_ZING_PATH,
  DASHBOARD_PATH,
  montserratFont,
} from '@core'
import { PublicRoute, PrivateRoute } from '@core/Components'
import { checkAuth, initializeFirebase } from '@fire'
import { useAppDispatch } from '@redux/hooks'
import { User, saveLogin } from '@redux/authSlice'

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles'

import { Home } from 'Home'
import { Survey } from 'Survey'
import { EditZing } from 'EditZing'
import { Dashboard } from 'Dashboard'

import './App.css'
import { CssBaseline } from '@mui/material'
import Components from './Components'

// when this theme is in, the default styles work though!!!
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightMedium: 600,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face: {
            font-family: '${montserratFont.fontFamily}';
            font-style: ${montserratFont.fontStyle};
            font-display: ${montserratFont.fontDisplay}; 
            font-weight: ${montserratFont.fontWeight};
            src: ${montserratFont.src};
           }
        `,
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
})

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
            <Route exact path={SURVEY_PATH} component={Survey} />
            <PrivateRoute exact path={EDIT_ZING_PATH} component={EditZing} />
            <PrivateRoute exact path={DASHBOARD_PATH} component={Dashboard} />
            <Route exact path="/components" component={Components} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
