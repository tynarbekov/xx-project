import * as ReactDom from 'react-dom'
import * as React from 'react'
import { App } from './App'
import './index.scss'

const app = (<App/>)

ReactDom.render(app, document.getElementById('root'))
