import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CrazoWeb from "../../../assets/crazoweb_logo.png";
import { useAdminLogin, useAdminRegister, useVerifyAdmin, useVerifyLoginAdmin } from "../../../hooks/admin/auth/useAdminRegister";

interface AdminLoginProps {
    onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [remember, setRemember] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const { register, loading: registerLoading } = useAdminRegister();
    const { verifyAdmin, loading: verifyAdminLoading } = useVerifyAdmin();
    const { login, loading: loginLoading } = useAdminLogin();
    const { verifyLogin, loading: verifyLoginAdminLoading } = useVerifyLoginAdmin();
    const isLoading =
        loginLoading ||
        registerLoading ||
        verifyAdminLoading ||
        verifyLoginAdminLoading;

    const validatePhone = (phone: string) => {
        return /^[6-9]\d{9}$/.test(phone); // Indian number
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateOtp = (otp: string) => {
        return otp.length >= 6; // adjust if 6-digit
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePhone(number)) {
            alert("Enter valid mobile number");
            return;
        }

        if (!validateOtp(otp)) {
            alert("Enter valid OTP");
            return;
        }

        if (isLogin) {
            console.log("LOGIN:", { number, otp, remember });
            try {
                const res = await verifyLogin({
                    phone: number,
                    otp: otp,
                });

                // if success
                if (res?.success) {
                    if (res.data?.token) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("adminId", res.data.adminId);
                    }
                    navigate("/admin-dashboard");
                    onClose();
                    // alert("Login successful");
                } else {
                    alert(res?.message || "Something went wrong");
                }

            } catch (err: any) {
                // 🔥 show backend error
                const errorMessage =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Registration failed";

                alert(errorMessage);
            }
        } else {
            try {
                const res = await verifyAdmin({
                    phone: number,
                    otp: otp,
                });

                // if success
                if (res?.success) {
                    if (res.data?.token) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("adminId", res.data.adminId);
                    }
                    navigate("/admin-dashboard");
                    onClose();
                    alert("Registration successful");
                } else {
                    alert(res?.message || "Something went wrong");
                }

            } catch (err: any) {
                const errorMessage =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Registration failed";

                alert(errorMessage);
            }
        }
    };

    const handleGetOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!number) {
            alert("Please enter mobile number");
            return;
        }

        if (!validatePhone(number)) {
            alert("Enter valid 10-digit mobile number");
            return;
        }

        if (!isLogin) {
            if (!name.trim()) {
                alert("Name is required");
                return;
            }

            if (!email || !validateEmail(email)) {
                alert("Enter valid email");
                return;
            }
        }

        try {
            setTimer(60);
            setIsTimerActive(true);
            let res;

            if (isLogin) {
                res = await login({ phone: number });
            } else {
                res = await register({
                    name,
                    email,
                    phone: number
                });
            }

            if (res?.success) {
                alert("OTP sent successfully");
            } else {
                alert(res?.message || "Something went wrong");
            }

        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                "Request failed";

            alert(errorMessage);
        }
    };

    useEffect(() => {
        let interval: any;

        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        if (timer === 0 && isTimerActive) {
            setIsTimerActive(false);
        }

        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">

                {/* CLOSE BUTTON */}
                <button className="login-close-btn" onClick={onClose}>
                    <IoClose size={22} />
                </button>

                <img className="login-logo-img" src={CrazoWeb} alt="logo" />

                <div className="login-title">
                    {isLogin ? "Welcome back" : "Create account"}
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    {/* REGISTER ONLY */}
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="login-input"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                                required
                            />
                        </>
                    )}

                    {/* NUMBER + OTP */}
                    <div className="input-group">
                        <input
                            type="tel"
                            placeholder="+91 00000 00000"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="login-input"
                            required
                        />

                        <span
                            className={`get-otp-text ${timer > 0 ? "disabled" : ""}`}
                            onClick={handleGetOtp}
                            style={{
                                pointerEvents: timer > 0 ? "none" : "auto",
                                opacity: timer > 0 ? 0.6 : 1,
                            }}
                        >
                            {timer > 0 ? `Resend in ${formatTime(timer)}` : "Get OTP"}
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="login-input"
                        required
                    />

                    {/* LOGIN ONLY */}
                    {isLogin && (
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
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="btn-loader"></span>
                        ) : isLogin ? (
                            "Login"
                        ) : (
                            "Register"
                        )}
                    </button>

                    {/* TOGGLE TEXT */}
                    <div
                        className="login-goto-register"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setIsTimerActive(false);
                            setTimer(0);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {isLogin ? (
                            <>
                                Don’t have an account? <span className="highlight-text">Register</span>
                            </>
                        ) : (
                            <>
                                Already have an account? <span className="highlight-text">Login</span>
                            </>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;