import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import CrazoWeb from "../../../assets/crazoweb_logo.png";

interface AdminLoginProps {
    onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [remember, setRemember] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ number, otp, remember });
    };

    const handleGetOtp = () => {
        if (!number) {
            alert("Please enter mobile number first");
            return;
        }
        console.log("Send OTP to:", number);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">

                {/* CLOSE BUTTON */}
                <button className="login-close-btn" onClick={onClose}>
                    <IoClose size={22} />
                </button>

                <img className="login-logo-img" src={CrazoWeb} alt="logo" />
                <div className="login-title">Welcome back</div>

                <form onSubmit={handleSubmit} className="login-form">

                    {/* NUMBER FIELD WITH GET OTP */}
                    <div className="input-group">
                        <input
                            type="tel"
                            placeholder="+91 00000 00000"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="login-input"
                            required
                        />
                        <span className="get-otp-text" onClick={handleGetOtp}>
                            Get OTP
                        </span>
                    </div>

                    {/* OTP FIELD */}
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                    </div>

                    <button type="submit" className="login-btn">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;