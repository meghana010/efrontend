
import React, { useState } from "react"

const ShopCart = ({ allItems, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      {allItems.map((allItems, index) => {
        return (
          <div className='box'  key={index}>
            <div className='product mtop'>
              <div className='img'>
                <img src={allItems.cover} alt='' />
              </div>
              <div className='product-details'>
                <h3>{allItems.name} {allItems.gender} {allItems.category} </h3>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price'>
                  <h4>${allItems.price}.00 </h4>
                  {}
                  <button onClick={() => addToCart(allItems)}>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ShopCart
