import React from "react"
import axios from "axios"
import { useState ,useEffect} from "react";
import "./style.css"
import { useAuth } from "../../components/MainPage/AuthContext";

  const Cart = ({ CartItem,setCartItem, addToCart, decreaseQty}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {loggedInEmail} = useAuth(); 

  useEffect(() => {
    if (loggedInEmail) {
    axios
      .get(`http://localhost:5000/cart?email=${loggedInEmail}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          //const userCartItems = response.data.filter((item) => item.email === loggedInEmail);
          setCartItem(response.data);
          const calculatedTotalPrice = response.data.reduce(
            (price, item) => price + item.quantity * item.price,
            0
          );
          setTotalPrice(calculatedTotalPrice);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    }
  }, [loggedInEmail,CartItem,setCartItem]);

  const handlePurchase = () => {
    // Send a request to store the cart items as purchase history
    axios.post(`http://localhost:5000/purchase-history?email=${loggedInEmail}`, CartItem).then(() => {
      setIsPurchased(true);
      
    });
  };
  
  return (
    <>
      <section className='cart-items'>
        <div className='containers d_flex'>
          {isLoading ? (
           <center ><p className="loading" > Loading...</p></center> 
          ) : (
            <>
              {Array.isArray(CartItem) && CartItem.length === 0 && (
                <h1 className='no-items product'>No Items are added in Cart</h1>
              )}
  
              { Array.isArray(CartItem) && CartItem.map((item) => {
                const productQty = item.price * item.quantity;
  
                return (
                  <div className='cart-list product d_flex' key={item.id}>
                    <div className='img'>
                      <img
                        src={item.cover}
                        alt={item.name}
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                     <br></br>
                    <div className='cart-details'>
                      <h3>{item.name} {item.gender} {item.category}</h3>
                      <h4>
                        ${item.price}.00 * {item.quantity}
                        <span>${productQty}.00</span>
                      </h4>
                    </div>
                    <div className='cart-items-function'>
                      <div className='removeCart'>
                        <button className='removeCart'>
                          <i className='fa-solid fa-xmark'></i>
                        </button>
                      </div>
                      <div className='cartControl d_flex'>
                        <button className='incCart' onClick={() => addToCart(item)}>
                          <i className='fa-solid fa-plus'></i>
                        </button>
                        <button className='desCart' onClick={() => decreaseQty(item)}>
                          <i className='fa-solid fa-minus'></i>
                        </button>
                      </div>
                    </div>
  
                    <div className='cart-item-price'></div>
                  </div>
                );
              })}
              <div className='cart-total product'>
                <h2>Cart Summary</h2>
                <div className='d_flex'>
                  <h4>Total Price: </h4>
                  
                  <h3> ${totalPrice}.00</h3>
                  {isPurchased ? (
                    <p>Purchase Successful!</p>
                  ) : (
                    <button onClick={handlePurchase} style={{backgroundColor:'green',color:'white',padding:'5px'}}>Purchase</button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
                  }
export default Cart ; 
