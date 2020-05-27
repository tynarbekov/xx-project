import { useEffect, useRef, useState } from 'react'
import Timeout = NodeJS.Timeout

export const useWebSocket = () => {

  const [message, setMessage] = useState<{ server_time: string } | null>(null)
  const [closed, setClosed] = useState<boolean>(false)
  const [connecting, setConnecting] = useState<boolean>(false)

  let lastUpdatedMessage: Date
  let ws: WebSocket

  const setAddress = (url: string) => {
    ws && ws.close()
    connect(url)
  }

  let interval: Timeout

  const connect = (url: string) => {
    !interval && customSetInterval()
    setClosed(false)
    ws = new WebSocket(url)
    if (ws.readyState === ws.CONNECTING) {
      setConnecting(true)
    }
    ws.onmessage = (e: MessageEvent) => {
      setConnecting(false)
      lastUpdatedMessage = new Date()
      setMessage(JSON.parse(e.data))
    }
    ws.onerror = () => {
      setClosed(true)
      clearInterval(interval)
    }
    ws.onclose = () => {
      setClosed(true)
      clearInterval(interval)
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(interval)
      ws.close()
    }
  }, [])

  const customSetInterval = () => {
    interval = setInterval(() => {
      const newDate = new Date()
      if (lastUpdatedMessage) {
        const diffInSeconds = (newDate.getTime() - lastUpdatedMessage.getTime()) / 1000
        if (!connecting && diffInSeconds > 0.7) {
          setClosed(true)
          clearInterval(interval)
        }
      }
    }, 600)
  }
  return {setAddress, message, closed, connecting}
}
