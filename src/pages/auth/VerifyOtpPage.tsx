import React, { useState, useEffect } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/Knight Panda Logo.png";

import { useUserVerify } from "../../hooks/user/useUserVerify";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verify, loading, error, clearError } = useUserVerify();

  const phone = location.state?.phone || "";
  const storeId = location.state?.storeId || "";

  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // 5 minutes timer
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError(null);
    clearError();

    if (!/^[0-9]{6}$/.test(otp)) {
      setFormError("OTP must be 6 digits");
      return;
    }

    if (timeLeft <= 0) {
      setFormError("OTP has expired. Please request a new OTP.");
      return;
    }

    try {
      const res = await verify({
        phone,
        otp,
        storeId,
      });

      console.log("OTP verified:", res);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleResendOtp = () => {
    if (timeLeft > 0) return;

    // Go back to registration page
    navigate(-1);

    // If you have a resend API, call it here instead:
    // resendOtp(phone);

    setTimeLeft(300);
    setOtp("");
    setFormError(null);
    clearError();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img className="login-logo-img" src={logo} alt="logo" />

        <div className="login-title">Verify OTP</div>

        <div className="otp-info-text">
          Enter the OTP sent to your email
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="tel"
            placeholder="123456"
            value={otp}
            onChange={(e) => {
              const value = e.target.value;

              setFormError(null);
              clearError();

              if (!/^\d*$/.test(value)) return;

              if (value.length > 6) return;

              setOtp(value);
            }}
            className="login-input"
            inputMode="numeric"
            maxLength={6}
            required
          />

          {formError && (
            <div className="error-text">
              {formError}
            </div>
          )}

          {error && (
            <div className="error-text">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || timeLeft <= 0}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="register-footer">
            {timeLeft > 0 ? (
              <>OTP expires in{": "}
                <span
                  className={`register-link ${timeLeft > 0 ? "disabled-link" : ""
                    }`}
                  onClick={handleResendOtp}
                >
                  {formatTime(timeLeft)}
                </span></>
            ) : (
              <> Didn’t receive the OTP?{" "}
                <span
                  className={`register-link ${timeLeft > 0 ? "disabled-link" : ""
                    }`}
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </span></>
            )}

          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;