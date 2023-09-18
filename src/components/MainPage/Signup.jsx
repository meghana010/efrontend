import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; 

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Custom validation for minimum 6 characters
    if (newPassword.length < 6) {
      e.target.setCustomValidity("Must have at least 6 characters");
    } else {
      e.target.setCustomValidity("");
    }

    // Check if the passwords match
    if (newPassword === confirmPassword) {
      const confirmPasswordInput = e.target.form.elements.password_two;
      confirmPasswordInput.setCustomValidity("");
    } else {
      const confirmPasswordInput = e.target.form.elements.password_two;
      confirmPasswordInput.setCustomValidity("Please enter the same Password as above");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if the passwords match
    if (newConfirmPassword === password) {
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Please enter the same Password as above");
    }
  };


  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        history("/home", { state: { id: email } });
      }
    } catch (e) {
      console.error("Error:", e);
      alert("Wrong details. Please try again.");
    }
  }

  return (
    <div className="login-container">
      <h1>Signup</h1>
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
          //onChange={(e) => setPassword(e.target.value)}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          className="login-input"
          name="password"
        />
        <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Verify Password"
        required
        className="login-input"
        name="password_two"
      />
        
        <button type="submit" className="login-button">
          Signup
        </button>
      </form>
      <div className="separator">
      <hr></hr>
      </div>
      <Link to="/" className="login-link">
        Login??
      </Link>
      <Link to="/forgot-password" className="login-link">
        Forgot Password??
      </Link>
    </div>
  );
}

export default Login;
