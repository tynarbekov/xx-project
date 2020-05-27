import { homeService } from '../../../services/home.service'
import { useWebSocket } from '../../../hooks/websocket.hook'
import { getDateFromUnixTime } from '../../../consts/helper'
import { AuthContext } from '../../../context/auth.context'
import PaperComponent from '../../components/paper'
import { Signal } from '../../components/signal'
import Spinner from '../../components/spinner'
import { useContext, useEffect } from 'react'
import Button from '../../components/button'
import * as React from 'react'

const styles = require('./index.scss')

const HomeScene = () => {

  const auth = useContext(AuthContext)
  const {request, loading} = homeService()
  const {setAddress, message, closed, connecting} = useWebSocket()

  const loadWSPath = async () => {
    try {
      const wsAddress = await request()
      setAddress(wsAddress.url)
    } catch (e) {
    }
  }

  const logout = () => auth.logout()

  useEffect(() => {
    if (closed) {
      loadWSPath()
    }
  }, [closed])

  useEffect(() => {
    loadWSPath()
  }, [])

  return (
    <div className={styles['home-main']}>
      <PaperComponent className={styles['home-paper']}>
        <div className={styles['header']}>
          <span className={styles['title']}>WebSocket</span>
          <Signal low={loading || connecting}/>
        </div>
        <div className={styles['info-block']}>
          {(loading || connecting) && <Spinner className={styles['spinner']}/>}
          {message &&
          <span className={[styles['message'], (loading || connecting) && styles['loading']].join(' ').trim()}>
            {getDateFromUnixTime(message.server_time)}
          </span>
          }
        </div>
        <Button className={styles['logout']} onClick={logout}>Logout</Button>
      </PaperComponent>
    </div>
  )
}

export default HomeScene
