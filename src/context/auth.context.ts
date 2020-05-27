import { createContext } from 'react'

function noop() {
}

interface IAuthContext {
  token: string | null
  isAuth: boolean
  login: (jwtToken: string) => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  login: noop,
  logout: noop,
  isAuth: false
})
