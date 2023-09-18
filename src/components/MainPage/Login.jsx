import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; 
//import PurchaseHistory from "./PurchaseHistory";
import { useAuth } from "./AuthContext";


function Login({ setCartItem, cartItem,purchaseHistory,setPurchaseHistory }) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loggedInEmail, setLoggedInEmail} = useAuth(); 
 // const [purchaseHistory, setPurchaseHistory] = useState([]);
 // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch cart data
    if (loggedInEmail) {
    axios
      .get(`https://eco-gtpf.onrender.com/cart?email=${loggedInEmail}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCartItem(response.data);
        } else {
          setCartItem([]);
        }
      })
      .catch((err) => console.log(err));

    // Fetch purchase history
    axios
      .get(`https://eco-gtpf.onrender.com/purchase-history?email=${loggedInEmail}`)
      .then((response) => {
        setPurchaseHistory(response.data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedInEmail ,setCartItem,setPurchaseHistory,cartItem,purchaseHistory]);

 async function submit(e) {

  e.preventDefault();

  try {

   const response = await axios.post("https://eco-gtpf.onrender.com/", {

    email,

    password,

   });

   if (response.data === "exist") {

    setLoggedInEmail(email); // Set the logged-in user's email

    history("/home", { state: { id: email } });
    

   } else if (response.data === "notexist") {

    alert("User has not signed up | Incorrect Credentials");

   }

  } catch (e) {

   console.error("Error:", e);

   alert("Wrong details. Please try again.");

  }

 }

 async function logout() {

  try {

   // Send a logout request to the server to clear the session or token

   await axios.post("https://eco-gtpf.onrender.com/logout");

   setLoggedInEmail(""); 
   setCartItem([]);
   setPurchaseHistory([]);
   history("/"); 

  } catch (error) {

   console.error("Logout Error:", error);

  }

 }

 return (

  <div className="login-container">

   {loggedInEmail ? (

    <div>
      

     <p>Welcome, {loggedInEmail}</p><br></br>

     <button onClick={logout} style={{

  backgroundColor: "red",

  color: "white",

  borderRadius: "5px",

  padding: "10px 20px",

  cursor: "pointer",

 }}>Logout</button>


    </div>

   ) : (

    <> <h1>Login</h1>

<form onSubmit={submit}>

 <input

 type="email"

 value={email}

 onChange={(e) => setEmail(e.target.value)}

 placeholder="Email"

 required

 className="login-input"

 />

 <input

 type="password"

 value={password}

 onChange={(e) => setPassword(e.target.value)}

 placeholder="Password"

 required

 className="login-input"

 />

 <button type="submit" className="login-button">

 Login

 </button>

</form>

<div className="separator">

 <hr></hr>

</div>

<Link to="/signup" className="signup-link">

 Signup??

</Link>

<Link to="/forgot-password" className="signup-link">

 Forgot Password??

</Link>


</> )}


  </div>

 );

}

export default Login;
