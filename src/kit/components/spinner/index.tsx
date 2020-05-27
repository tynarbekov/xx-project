import * as React from 'react'

const styles = require('./index.scss')

interface ISpinnerProps {
  size?: string
  speed?: string
  className?: string
}

const Spinner = (props: ISpinnerProps) => {
  const {className, size = '30px', speed = '0.9s'} = props
  const classNames = [styles['spinner-main'], className].join(' ').trim()
  return (
    <div className={classNames} style={{height: size, width: size, animationDuration: speed}}/>
  )
}

export default Spinner
