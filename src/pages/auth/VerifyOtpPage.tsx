import React, { useState } from "react"
import "./Login.css"
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png"

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [number] = useState("")
  const [otp, setOtp] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ number, otp })
  }

  // const goToRegister = () => {
  //   navigate("/register");
  // };

  const goToBack = () => {
    navigate(-1);
  };


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img className="login-logo-img" src={logo} alt="logo" />
        <div className="login-title">Verify Otp</div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <input
            type="number"
            placeholder="123456"
            value={number}
            onChange={(e) => setOtp(e.target.value)}
            className="login-input"
            required
          />

          {/* Button */}
          <button type="submit" className="login-btn">
            Verify Otp
          </button>

          {/* Footer */}
          <p className="register-footer">
            Didn’t receive the OTP? <a onClick={goToBack}>Resend OTP</a>
          </p>

        </form>
      </div>
    </div>
  )
}

export default VerifyOtpPage