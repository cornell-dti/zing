import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAppSelector } from '@redux/hooks'

import { RouteProps } from '@core/Types'
import { DASHBOARD_PATH } from '@core/Constants'

export const PublicRoute = ({
  component: Component,
  ...routeProps
}: RouteProps) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Route
      {...routeProps}
      render={(props) =>
        user ? <Redirect to={DASHBOARD_PATH} /> : <Component {...props} />
      }
    />
  )
}
