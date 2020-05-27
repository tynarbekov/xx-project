import { RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import LoginScene from './kit/scene/login'
import HomeScene from './kit/scene/home'
import { Redirect } from 'react-router'
import * as React from 'react'

interface NavigationEntryComponentProps<Params = any> extends RouteConfigComponentProps<Params> {
  route?: NavigationEntry
}

interface NavigationEntry extends RouteConfig {
  exact?: boolean
  routes?: NavigationEntry[]
  check?: (isLogged: boolean) => boolean
  component?: React.ComponentType<NavigationEntryComponentProps<any>> | React.ComponentType
}

export const ROUTES: NavigationEntry[] = [
  {
    check: (isLogged) => isLogged,
    path: '/',
    component: HomeScene,
    exact: true
  },
  {
    check: (isLogged) => !isLogged,
    path: '/login',
    component: LoginScene,
    exact: true
  },
  {
    check: (isLogged) => !isLogged,
    path: '*',
    component: () => <Redirect to='/login'/>
  },
  {
    check: (isLogged) => isLogged,
    path: '*',
    component: () => <Redirect to='/'/>
  },
]
