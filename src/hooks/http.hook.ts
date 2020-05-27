import { AuthContext } from '../context/auth.context'
import { useCallback, useContext } from 'react'

interface IFetcher {
  url: string
  method?: string
  body?: any
  headers?: any
  isAuth?: boolean
  withCredentials?: boolean
}

export const httpRequest = () => {
  const auth = useContext(AuthContext)

  const fetcher = useCallback(async (
    {url, method = 'GET', body = null, headers = {}, isAuth = false, withCredentials = false}: IFetcher) => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      if (withCredentials) {
        headers['x-test-app-jwt-token'] = auth.token
      }
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()
      if (withCredentials && response.status === 400 || response.status === 401) {
        auth.logout()
      }
      if (!response.ok) {
        throw {data, status: response.status}
      }
      if (isAuth) {
        const token = response.headers.get('x-test-app-jwt-token')
        token && auth.login(token)
      }
      return data
    } catch (e) {
      if (isAuth) {
        auth.logout()
      }
      throw e
    }
  }, [])
  return {fetcher}
}
