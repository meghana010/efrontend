import React from "react"
import Sdata from "./Sdata"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Home.css"
const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
     <br></br> 
      <Slider {...settings}>
       
        {Sdata.map((value, index) => {
          return (
            <>
              <div className='box d_flex top abc' key={index}>
                <div className='left'>
                  <h1 className="small1">{value.title}</h1>
                  <p className="sml2">{value.desc}</p>
                  <button className='btn-primary'>Visit Collections</button>
                </div>
                <br></br><br></br>
                <div className='right nodisplay'>
                  <img src={value.cover} alt='' className="nodisplay" />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard
