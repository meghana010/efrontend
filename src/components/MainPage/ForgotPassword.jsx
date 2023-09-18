import React, { useState } from "react";
import styled from "styled-components";

const ForgotPasswordContainer = styled.div`
  text-align: center;
  margin: 50px auto;
  width: 50%;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }
`;
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <ForgotPasswordContainer>
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;
