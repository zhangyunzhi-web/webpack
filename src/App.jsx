import React from 'react'
import ReactDom from 'react-dom'
import { isNull, isZero } from './util'

isNull({})
//ES6
const App = () => {
    return (
        <div>
            <h1>React大法好</h1>
        </div>
    )
}

export default App
ReactDom.render(<App />, document.getElementById('app'))

