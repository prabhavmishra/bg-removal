import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import BuyCredit from './pages/BuyCredit'
import Result from './pages/result'
import Home from './pages/home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='min-h-screen' style={{backgroundImage: 'url(/bg-main.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
        <Route path='/buy' element={<BuyCredit/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
