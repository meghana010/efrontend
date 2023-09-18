import React from "react";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "./purchase.css";
function PurchaseHistory({ purchaseHistory,setPurchaseHistory }) {
  const {loggedInEmail} = useAuth(); 

  useEffect(()=>{
if(loggedInEmail)
{
  axios
  .get(`https://eco-gtpf.onrender.com/purchase-history?email=${loggedInEmail}`)
  .then((response) => {
    setPurchaseHistory(response.data);
  })
  .catch((err) => console.log(err));
}
  }, [loggedInEmail ,purchaseHistory,setPurchaseHistory]

  );
  return (
    <div className="whole">
    <center><h2 className="mrg">Purchase History</h2></center>  
      { Array.isArray(purchaseHistory) && purchaseHistory.length === 0 ? (
       <center> <p className="mrg2">No purchase history available.</p>
       <p><br></br></p></center>
       
      ) : (
        <div className="purchase">
          {purchaseHistory.map((purchase) => (
            <div key={purchase._id} className="myitems">
             <div >    <img src={purchase.cover} alt="Product Cover" className="myimg"/></div>
              <h4>{purchase.name} {purchase.category} {purchase.gender}</h4>
             
              <p style={{color:'red'}}>Quantity: {purchase.quantity}</p>
              <p style={{color:'green'}}>${purchase.price}.00</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
