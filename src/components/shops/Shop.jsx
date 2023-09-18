import React from "react"
import ShopCart from "./ShopCart"
import "./style.css"
import Catg from "./Catg"
const Shop = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
        <Catg/>
         <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Top Products</h2>
              </div>
              <div className='heading-right row '>
                <span><a href='/pages'>View all</a></span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1 myflex'>
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Shop
