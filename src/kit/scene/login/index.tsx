import { loginService } from '../../../services/auth.service'
import { TextField } from '../../components/text-field'
import PaperComponent from '../../components/paper'
import Button from '../../components/button'
import { useState } from 'react'
import * as React from 'react'

const styles = require('./index.scss')

const LoginScene = () => {

  const {request, error, loading, clearError} = loginService()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value)
    error && clearError()
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
    error && clearError()
  }

  const onLogin = async () => {
    try {
      await request({username, password})
    } catch (e) {
    }
  }

  const isLoginEnable: boolean = !!username && !!password

  return (
    <div className={styles['login-main']}>
      <PaperComponent className={styles['login-paper']}>
        <span className={styles['title']}>Login</span>
        <TextField error={!!error} value={username} onChange={onChangeUsername}
                   className={styles['login-item']}
                   label='Username'/>
        <TextField error={!!error} value={password} onChange={onChangePassword} className={styles['login-item']}
                   label='Password'
                   type='password'/>
        {error &&
        <span className={styles['error-message']}>{error.description}</span>
        }
        <Button loading={loading} disabled={!isLoginEnable} loaderClassName={styles['login-item']} onClick={onLogin}
                className={styles['login-item']}>Login</Button>
      </PaperComponent>
    </div>
  )
}

export default LoginScene
