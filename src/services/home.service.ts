import { useCallback, useState } from 'react'
import { httpRequest } from '../hooks/http.hook'
import { subscribePath } from '../consts/path'

const homeService = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {fetcher} = httpRequest()
  const request = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetcher({url: subscribePath, withCredentials: true})
      setLoading(false)
      return response
    } catch (e) {
      setLoading(false)
      throw e
    }
  }, [])
  return {loading, request}
}
export { homeService }
