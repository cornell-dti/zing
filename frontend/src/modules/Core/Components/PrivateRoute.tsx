import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAppSelector } from '@redux/hooks'

import { RouteProps } from '@core/Types'
import { HOME_PATH } from '@core/Constants'

export const PrivateRoute = ({
  component: Component,
  ...routeProps
}: RouteProps) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Route
      {...routeProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={HOME_PATH} />
      }
    />
  )
}
