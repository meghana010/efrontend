// RegistrationSuccess.js
import React from "react";
import { Link } from "react-router-dom";

function RegistrationSuccess() {
  return (
    <div>
      <h2>Registration Successful</h2>
      <p>Your registration was successful!</p>
      <p>
        <Link to="/user">Log in</Link>
      </p>
    </div>
  );
}

export default RegistrationSuccess;
