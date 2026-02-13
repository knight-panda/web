import React, { useState } from "react"
import "./Login.css"
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png"

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ number, password, remember })
    }

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <img className="login-logo-img" src={logo} alt="logo" />
                <div className="login-title">Welcome back</div>

                <form onSubmit={handleSubmit} className="login-form">
                    {/* Email */}
                    <input
                        type="number"
                        placeholder="+91 00000 00000"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="login-input"
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />

                    {/* Row */}
                    <div className="login-row">
                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember for 30 days
                        </label>

                        <a href="#" className="link">
                            Forgot password
                        </a>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    {/* Footer */}
                    <p className="login-footer">
                        Don't have an account? <a onClick={goToRegister}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage