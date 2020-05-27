import { loginPath } from '../consts/path'
import { httpRequest } from '../hooks/http.hook'
import { useCallback, useState } from 'react'

const loginService = () => {

  let retryCount = 0
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<{ code: string, description: string } | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const {fetcher} = httpRequest()

  const request = useCallback(async (params: { username: string, password: string }) => {
    setLoading(true)
    try {
      const response = await fetcher({url: loginPath, method: 'POST', body: params, isAuth: true})
      setLoading(false)
      return response
    } catch (e) {
      if (2 >= retryCount && e.status === 500) {
        retryCount++
        await request(params)
      } else {
        setLoading(false)
        setError({code: e.data.code, description: e.data.description})
        throw e
      }
    }
  }, [])
  return {loading, error, request, clearError}
}

export { loginService }
