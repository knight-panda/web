import React, { useState } from "react"
import "./AdminLogin.css"
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import CrazoWeb from "../../../assets/crazoweb_logo.png"

interface AdminLoginProps {
    onClose: () => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {

    const navigate = useNavigate();
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ number, password, remember })
    }

    const goToRegister = () => {
        navigate("/my-store/register");
    };

    const goToNewPasswordPage = () => {
        navigate("/my-store/new-password");
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">

                {/* CROSS BUTTON */}
                <button className="login-close-btn" onClick={onClose}>
                    <IoClose size={22} />
                </button>

                <img className="login-logo-img" src={CrazoWeb} alt="logo" />
                <div className="login-title">Welcome back</div>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="number"
                        placeholder="+91 00000 00000"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="login-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />

                    <div className="login-row">
                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember for 30 days
                        </label>

                        <a href="#" className="link" onClick={goToNewPasswordPage}>
                            Forgot password
                        </a>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    <p className="login-footer">
                        Don't have an account? <a onClick={goToRegister}>Sign up</a>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default AdminLogin