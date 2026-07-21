import React, { useState } from "react"
import "./Login.css"
// import { useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png"

const NewPasswordPage = () => {
  // const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [otp ] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ password, otp })
  }

  // const goToRegister = () => {
  //   navigate("/register");
  // };

  // const goToBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img className="login-logo-img" src={logo} alt="logo" />
        <div className="login-title">Set New Password</div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          {/* Button */}
          <button type="submit" className="login-btn">
            Save
          </button>

        </form>
      </div>
    </div>
  )
}

export default NewPasswordPage