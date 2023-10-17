import React, { useState } from "react"
import "./App.css"
import axios from "axios"
import {Route,Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Adata from "./components/shops/Adata"
import Login from "./components/MainPage/Login"
import ShopNow from "./components/shops/ShopNow"
import Signup from "./components/MainPage/Signup"
import Contact from "./components/MainPage/Contact"
import ForgotPassword from "./components/MainPage/ForgotPassword"
import { useAuth } from "./components/MainPage/AuthContext";
import PurchaseHistory from "./components/MainPage/PurchaseHistory"

function App() {
  //const location=useLocation();
  const history = useNavigate();
  const { productItems } = Data
  const { shopItems } = Sdata
  const { allItems } = Adata
  const [CartItem, setCartItem] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const { loggedInEmail } = useAuth(); 
  
  const decreaseQty = (product) => {
    const productExist = CartItem.find((item) => item.id === product.id);
  
    if (productExist.quantity === 1) {
    axios
        .post(`https://eco-gtpf.onrender.com/remove-from-cart/`, { productId: product.id, quantity: 1,email: loggedInEmail })
        .then((response) => {
          if (response.data.success) {
              setCartItem(CartItem.filter((item) => item.id !== product.id));
          }
        })
        .catch((error) => {
          history('/');
          console.error("Error removing item from cart:", error);
        });
    } else {
         axios
        .post(`https://eco-gtpf.onrender.com/update-cart-quantity/`, { productId: product.id, quantity:product.quantity -1,email: loggedInEmail })
        .then((response) => {
          if (response.data.success) {
                 setCartItem(
              CartItem.map((item) =>
                item.id === product.id ? { ...productExist, quantity: productExist.quantity - 1 } : item
              )
            );
          }
        })
        .catch((error) => {
          history('/');
          console.error("Error updating item quantity in cart:", error);
        });
    }
  };
  

  const addToCart = (product) => {
    const productExist = CartItem.find((item) => item.id === product.id);
      const quantityToAdd = 1;
  
    if (productExist) {
        const updatedCartItem = { ...productExist, quantity: productExist.quantity + quantityToAdd };
      axios
        .post(`https://eco-gtpf.onrender.com/update-cart-item/`, { item: updatedCartItem ,email: loggedInEmail})
        .then((response) => {
          // Handle the response if needed
          if (response.data.success) {
                setCartItem(CartItem.map((item) => (item.id === product.id ? updatedCartItem : item)));
          }
        })
        .catch((error) => {
            history('/');
          console.error("Error updating item quantity in cart:", error);
        });
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const itemToAdd = { ...product, quantity: quantityToAdd };
  
        axios
        .post(`https://eco-gtpf.onrender.com/add-to-cart/`, { item: itemToAdd,email: loggedInEmail })
        .then((response) => {
               if (response.data.success) {
               setCartItem([...CartItem, itemToAdd]);
          }
        })
        .catch((error) => {
           history('/');
          console.error("Error adding item to cart:", error);
        });
    }
  };
  
  return (
    <>
     
      <Header CartItem={CartItem} />
  <Routes>
    <Route path="/" element={<Login setCartItem={setCartItem} CartItem={CartItem} purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory}/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/home" element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
    <Route path="/pages" element={<ShopNow addToCart={addToCart} allItems={allItems} />} />
    <Route path="/purchase-history" element={<PurchaseHistory purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory}/>}/>
    <Route path="/contact" element={<Contact/>} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/dashboard" element={<Dashboard purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory}/>}/>
    <Route path="/cart" element={<Cart CartItem={CartItem} setCartItem={setCartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
  </Routes>
  <Footer />
    
    </>
  )
}

export default App
