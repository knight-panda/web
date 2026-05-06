import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png";

import { useUserRegister } from "../../hooks/user/useUserRegister";

const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        register,
        loading,
        error,
        clearError,
    } = useUserRegister();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState<string | null>(null);

    // ✅ Validation
    const validatePhone = (phone: string) =>
        /^[6-9][0-9]{9}$/.test(phone);

    const validateEmail = (email: string) =>
        /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);

    const validatePassword = (password: string) =>
        password.length >= 6;

    const clearAllErrors = () => {
        setFormError(null);
        clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        clearAllErrors();

        // ✅ Name validation
        const trimmedName = name.trim();

        if (!trimmedName) {
            setFormError("Name is required");
            return;
        }

        if (trimmedName.length < 3) {
            setFormError("Name must be at least 3 characters");
            return;
        }

        if (!/^[A-Za-z ]+$/.test(trimmedName)) {
            setFormError("Name can contain only letters");
            return;
        }

        // ✅ Email validation
        if (!validateEmail(email)) {
            setFormError("Enter valid email");
            return;
        }

        // ✅ Phone validation
        if (!validatePhone(number)) {
            setFormError(
                "Enter valid 10-digit mobile number starting with 6–9"
            );
            return;
        }

        // ✅ Password validation
        if (!validatePassword(password)) {
            setFormError(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            const res = await register({
                name,
                email,
                phone: number,
                password,
                storeId: localStorage.getItem("activeStoreId") || "",
            });

            console.log("Register success:", res);

            // ✅ Navigate OTP page
            navigate("/verify-otp", {
                state: {
                    phone: number,
                    storeId: res.data.storeId,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const goToLogin = () => {
        navigate(-1);
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <img
                    className="register-logo-img"
                    src={logo}
                    alt="logo"
                />

                <div className="register-title">
                    Register
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="register-form"
                >
                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => {
                            clearAllErrors();
                            setName(e.target.value);
                        }}
                        className="register-input"
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => {
                            clearAllErrors();
                            setEmail(e.target.value);
                        }}
                        className="register-input"
                        required
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        placeholder="00000 00000"
                        value={number}
                        onChange={(e) => {
                            const value = e.target.value;

                            // ✅ clear errors
                            clearAllErrors();

                            // only digits
                            if (!/^\d*$/.test(value)) return;

                            // max 10 digits
                            if (value.length > 10) return;

                            // first digit must be 6-9
                            if (
                                value.length === 1 &&
                                !/[6-9]/.test(value)
                            )
                                return;

                            setNumber(value);
                        }}
                        className="register-input"
                        inputMode="numeric"
                        maxLength={10}
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            clearAllErrors();
                            setPassword(e.target.value);
                        }}
                        className="register-input"
                        required
                    />

                    {/* Form Error */}
                    {formError && (
                        <div className="register-error">
                            {formError}
                        </div>
                    )}

                    {/* API Error */}
                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Registering..."
                            : "Register"}
                    </button>

                    {/* Footer */}
                    <p className="register-footer">
                        Already have an account?{" "}
                        <span
                            className="register-link"
                            onClick={goToLogin}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;