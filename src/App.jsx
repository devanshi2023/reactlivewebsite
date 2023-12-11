import { createContext, useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Products from './Components/Products'
import Search from './Components/Search'
import SingleProduct from './Components/SingleProduct'







import './App.css'
// import Alert from './components/Alert'
export const MainContext = createContext()
function App() {
  const [products, setProducts] = useState(Products)
  const [cart, setCart] = useState([])
  const[searched,setSearched] = useState([])
  const[single,setSingleProduct] = useState({})

  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  let navigate = useNavigate()
  // let [alert, setAlert] = useState({ show: false, message: '', head: '', success: false })

 

  return (
    <>
        <MainContext.Provider value={{ searched , single , setSingleProduct,setCart , navigate , setSearched,cart, products: products }}>
          {
            alert.show && <Alert />}
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/search' element={<Search />} />
            <Route path='/singleproduct' element={<SingleProduct />} />
         




          </Routes>
        </MainContext.Provider>
    </>
  )
}

export default App
