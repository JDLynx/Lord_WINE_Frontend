import { useState } from 'react'
import './App.css'
import Home from './vistas/Home'
import Login from './vistas/Login'
import CarritoCompras from './vistas/CarritoCompras'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CarritoCompras />
    </>
  )
}

export default App
