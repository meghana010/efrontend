import React from "react"

const Catg = () => {
  const data = [
    {
    
      cateName: "Men's Shirt",
    },
    {
  
      cateName: "Men's Trouser",
    },
    {
      cateName: "Women's Jeans",
    },
    {
      cateName: "Women's Tops",
    },
    {

      cateName: "Women's T-shirt",
    },
    {
      cateName: "Women's Sweater",
    },
    {
      cateName: "Men's Jacket",
    },
    {
      cateName: "Women's Cardigan",
    },
    
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Category</h1>
          <h1>Brand</h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>

              <span>{value.cateName}</span>
            </div>
          )
        })}
       
      </div>
    </>
  )
}

export default Catg
