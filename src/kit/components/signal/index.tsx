import * as React from 'react'

const styles = require('./index.scss')

interface ISignalProps {
  low?: boolean
}

export const Signal = (props: ISignalProps) => {
  const  {low = false} = props
  const rowClassNames = [styles['item'], low && styles['low']].join(' ').trim()
  return (
    <div className={styles['signal-main']}>
      <span className={rowClassNames}/>
      <span className={rowClassNames}/>
      <span className={rowClassNames}/>
    </div>
  )
}
