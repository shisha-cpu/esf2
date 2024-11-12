import { useState } from 'react'
import Header from './Components/Header'
import { Home } from './Pages/Home'
import Footer from './Components/Footer'
import { Routes , Route } from 'react-router-dom'
import { Product } from './Pages/Product'
import { About } from './Pages/About'
import { Contact } from './Pages/Contact'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Basket from './Pages/Basket'
import Favourites from './Pages/Favourites'
import PhoneIcon from './Components/PhoneIcon'
function App() {


  return (
    <>
    <Header />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Product />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/basket' element={<Basket />} />
      <Route path='/favourites' element={<Favourites />} />
    </Routes>
    <Footer />
    <PhoneIcon />
    </>
  )
}

export default App
