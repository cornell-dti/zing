import React from 'react'
import {
  RouteComponentProps,
  RouteProps as DefaultRouteProps,
} from 'react-router'

export interface RouteProps extends DefaultRouteProps {
  component: React.ComponentType<RouteComponentProps>
}
