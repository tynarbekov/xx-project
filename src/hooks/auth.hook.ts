import { useCallback, useEffect, useState } from 'react'

const storageName = 'authToken'

export const useAuth = () => {

  const getToken = (): string | null => {
    const tokenFromLocalStorage = localStorage.getItem(storageName)
    const data = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : null
    return data ? data : null
  }

  const [token, setToken] = useState<string | null>(getToken())

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)

    localStorage.setItem(storageName, JSON.stringify(jwtToken))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const jwtToken = getToken()
    jwtToken && login(jwtToken)
  }, [login])


  return {login, logout, token}
}
