import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Knight Panda Logo.png";
import { useUserLogin } from "../../hooks/user/useUserLogin";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { login, loading, error } = useUserLogin();

    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);

    // ✅ Validation
    const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
    const validatePassword = (password: string) => password.length >= 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFormError(null);

        // 🔥 Strong validation
        if (!validatePhone(number)) {
            setFormError("Phone must be 10 digits");
            return;
        }

        if (!validatePassword(password)) {
            setFormError("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await login({
                phone: number,
                password: password,
                storeId: "94b81338-2018-4a0b-8ddb-e0a6d9af8699", // ⚠️ replace dynamically
            });

            // ✅ Success
            console.log("Login success:", res);

            // 👉 Redirect after login
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    const goToNewPasswordPage = () => {
        navigate("/my-store/new-password");
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <img className="login-logo-img" src={logo} alt="logo" />
                <div className="login-title">Welcome back</div>

                <form onSubmit={handleSubmit} className="login-form">
                    {/* Phone */}
                    <input
                        type="tel"
                        placeholder="00000 00000"
                        value={number}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (!/^\d*$/.test(value)) return;

                            if (value.length > 10) return;

                            if (value.length === 1 && !/[6-9]/.test(value)) return;

                            setNumber(value);
                        }}
                        className="login-input"
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
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

                    {/* Error Messages */}
                    {formError && <div className="error-text">{formError}</div>}
                    {error && <div className="error-text">{error}</div>}

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

                        <span className="link" onClick={goToNewPasswordPage}>
                            Forgot password
                        </span>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* Footer */}
                    <p className="login-footer">
                        Don't have an account?{" "}
                        <span className="link" onClick={goToRegister}>
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;