import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Products from './components/Products'
import ProductsDetails from './components/ProductsDetails'
import Cart from './components/Cart'
import React from 'react'
import BankDetails from './components/BankDetails'
import OrderCompleted from './components/OrderCompleted'
import Orders from './components/Orders'

function App() {
  return (
    <>

    <BrowserRouter>

    <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>

      <Route path='/products' element={<Products/>}/>
      <Route path='/products/:id' element={<ProductsDetails/>}/>
      <Route path='/products/cart' element={<Cart/>}/>
      <Route path='/products/:id/cart/bankdetails' element={<BankDetails/>}/>
      <Route path='/products/:id/cart/bankdetails/orderCompleted' element={<OrderCompleted/>}/>
      <Route path='/products/:id/cart/orders' element={<Orders/>}/>

    </Routes>
      </BrowserRouter>

      {/* <Hello/> */}
      
    </>
  )
}

export default App
