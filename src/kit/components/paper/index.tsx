import * as React from 'react'

const styles = require('./index.scss')

interface IPaperProps {
  className?: string
  children?: React.ReactChild | React.ReactNode
}

const PaperComponent = (props: IPaperProps) => {
  const {className, children} = props
  const classNames = [styles['paper-main'], className].join(' ').trim()
  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

export default PaperComponent
