import React, { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png";

import { useUserVerify } from "../../hooks/user/useUserVerify";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ include clearError
  const { verify, loading, error, clearError } = useUserVerify();

  // ✅ Get data from register page
  const phone = location.state?.phone || "";
  const storeId = location.state?.storeId || "";

  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError(null);
    clearError();

    // ✅ OTP validation
    if (!/^[0-9]{6}$/.test(otp)) {
      setFormError("OTP must be 6 digits");
      return;
    }

    try {
      const res = await verify({
        phone,
        otp,
        storeId,
      });

      console.log("OTP verified:", res);

      // ✅ Redirect after success
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img className="login-logo-img" src={logo} alt="logo" />

        <div className="login-title">Verify OTP</div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* OTP */}
          <input
            type="tel"
            placeholder="123456"
            value={otp}
            onChange={(e) => {
              const value = e.target.value;

              // ✅ clear errors while typing
              setFormError(null);
              clearError();

              // only digits
              if (!/^\d*$/.test(value)) return;

              // max 6 digits
              if (value.length > 6) return;

              setOtp(value);
            }}
            className="login-input"
            inputMode="numeric"
            maxLength={6}
            required
          />

          {/* Form Error */}
          {formError && (
            <div className="error-text">
              {formError}
            </div>
          )}

          {/* API Error */}
          {error && (
            <div className="error-text">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Footer */}
          <p className="register-footer">
            Didn’t receive the OTP?{" "}
            <span
              className="register-link"
              onClick={goToBack}
            >
              Resend OTP
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;