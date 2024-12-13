import React from 'react'
import Editor from './Components/Editor.jsx'

const App = () => {
  return (
    <div>
      <h1 className='heading' >Collaborative Text Editor</h1>

      <Editor/>

      <div style={{textAlign:'center'}} >
        <p>A Krix Product</p>
      </div>
    </div>
  )
}

export default App
