import Spinner from '../spinner'
import * as React from 'react'

const styles = require('./index.scss')

interface IButtonProps {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  className?: string
  loaderClassName?: string
  children?: React.ReactChild | React.ReactNode
}

const Button = (props: IButtonProps) => {
  const {children, onClick, className, disabled, loading, loaderClassName} = props
  const classNames = [styles['main-button'], className].join(' ').trim()
  return (
    <>
      {!loading ?
        <button onClick={onClick} className={classNames} disabled={disabled}>
          {children}
        </button>
        :
        <Spinner className={loaderClassName}/>
      }
    </>
  )
}

export default Button
