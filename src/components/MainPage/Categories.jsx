import React from "react"

const Categories = () => {
  const data = [
    {
      cateName: "Patagonia",
    },
    {
      cateName: "Okhai",
    },
    {
      cateName: "People Tree",
    },
    {
      cateName: "Wholesome Culture",
    },
    {
      cateName: "H & M",
    },
    {
      
      cateName: "Doodlage",
    },
    {
      
      cateName: "Nicobar",
    },
    {
     
      cateName: "SUI",
    },
    {
      
      cateName: "The Summer House",
    },
    
  ]

  return (
    <>
      <div className='category'>
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

export default Categories
