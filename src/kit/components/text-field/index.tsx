import * as React from 'react'

const styles = require('./index.scss')

interface Props {
  type?: string
  label?: string
  color?: string
  width?: string
  height?: string
  border?: string
  error?: boolean
  fontSize?: string
  className?: string
  disabled?: boolean
  background?: string
  placeholder?: string
  borderRadius?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField = (props: Props) => {

  const inputRef = React.createRef<HTMLInputElement>()

  const {
    type,
    onChange,
    disabled,
    className,
    value = '',
    label = '',
    error = false,
    width = '100%',
    height = '55px',
    fontSize = '14px',
    placeholder = ' ',
    color = '#9B9EBB',
    background = '#fff',
    borderRadius = '6px',
    border = error ? '0.5px solid #FF5647' : undefined,
  } = props
  const classNames = [styles['text-field'], className].join(' ').trim()
  const inputStyles = {
    color,
    width,
    height,
    border,
    padding: '0 22px',
    fontSize,
    background,
    placeholder,
    borderRadius,
    backgroundColor: '#fff',
    paddingRight: '22px',
  }
  return (
    <div className={styles['wrapper']}>
      <div className={classNames}>
        <input
          value={value}
          ref={inputRef}
          disabled={disabled}
          onChange={onChange}
          style={inputStyles}
          placeholder={placeholder}
          autoComplete={`new-${type}`}
          type={type}
          className={styles['input']}/>
        <legend>
          {label}
        </legend>
      </div>
    </div>
  )
}
