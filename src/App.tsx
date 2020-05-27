import { AuthContext } from './context/auth.context'
import { renderRoutes } from 'react-router-config'
import { createBrowserHistory } from 'history'
import { useAuth } from './hooks/auth.hook'
import { Router } from 'react-router-dom'
import { ROUTES } from './routes'
import * as React from 'react'

const styles = require('./App.scss')

const history = createBrowserHistory()

export const App = () => {

  const {token, login, logout} = useAuth()
  const isAuth = !!token

  const getRoutes = () => ROUTES.filter(route => route.check ? route.check(isAuth) : true) || []

  return (
    <AuthContext.Provider value={{token, logout, login, isAuth}}>
      <div className={styles['main-app']}>
        <Router history={history}>
          {renderRoutes(getRoutes())}
        </Router>
      </div>
    </AuthContext.Provider>
  )
}
