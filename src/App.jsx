import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import CaesarCiphar from "./components/Cryptography"


function App() {

  return (
    <>
      <div>
        <Navbar/>
        <CaesarCiphar/>
      </div> 
    </>
  )
}

export default App
