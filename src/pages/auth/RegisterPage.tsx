import React, { useState } from "react"
import "./Register.css"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Knight Panda Logo.png"

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ number, password, name, email })
    }

    const goToLogin = () => {
        navigate(-1);
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <img className="register-logo-img" src={logo} alt="logo" />
                <div className="register-title">Register</div>

                <form onSubmit={handleSubmit} className="register-form">
                    {/* Email */}
                    <input
                        type="name"
                        placeholder="Enater Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-input"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                        required
                    />

                    <input
                        type="number"
                        placeholder="+91 00000 00000"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="register-input"
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        required
                    />

                    {/* Button */}
                    <button type="submit" className="register-btn">
                        Register
                    </button>

                    {/* Footer */}
                    <p className="register-footer">
                        Don't have an account? <a onClick={goToLogin}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage