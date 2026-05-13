import "./StoreSettings.css";
import { useState } from "react";

const StoreSettings = () => {
    const [settings, setSettings] = useState({
        deliveryFee: 40,
        freeDeliveryAbove: 499,
        minimumOrderAmount: 199,
        packagingFee: 5,
        platformFee: 3,

        gstPercentage: 18,

        codEnabled: true,
        codFee: 20,
        onlinePaymentEnabled: true,

        razorpayEnabled: true,
        razorpayKeyId: "rzp_test_xxxxxxxx",
        razorpayKeySecret: "••••••••••••",

        upiEnabled: true,
        upiId: "store@upi",

        walletEnabled: true,

        currency: "INR",
        isActive: true,

        whatsappNotificationEnabled: true,
        emailNotificationEnabled: true,
        smsNotificationEnabled: false,
    });

    const handleChange = (key: string, value: any) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="settings-page">

            <div className="settings-header">
                <div className="sp-title">Store Settings</div>
                <div className="sp-desc">Manage your ecommerce store configuration</div>
            </div>

            <div className="settings-grid">

                {/* DELIVERY */}
                <div className="settings-card">
                    <h2>Delivery Settings</h2>

                    <div className="form-group">
                        <label>Delivery Fee</label>
                        <input
                            type="number"
                            value={settings.deliveryFee}
                            onChange={(e) =>
                                handleChange("deliveryFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Free Delivery Above</label>
                        <input
                            type="number"
                            value={settings.freeDeliveryAbove}
                            onChange={(e) =>
                                handleChange(
                                    "freeDeliveryAbove",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Minimum Order Amount</label>
                        <input
                            type="number"
                            value={settings.minimumOrderAmount}
                            onChange={(e) =>
                                handleChange(
                                    "minimumOrderAmount",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Packaging Fee</label>
                        <input
                            type="number"
                            value={settings.packagingFee}
                            onChange={(e) =>
                                handleChange("packagingFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Platform Fee</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>GST Percentage</label>
                        <input
                            type="number"
                            value={settings.gstPercentage}
                            onChange={(e) =>
                                handleChange("gstPercentage", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* PAYMENT */}
                <div className="settings-card">
                    <h2>Payment Settings</h2>

                    <div className="toggle-group">
                        <span>Cash On Delivery</span>
                        <input
                            type="checkbox"
                            checked={settings.codEnabled}
                            onChange={(e) =>
                                handleChange("codEnabled", e.target.checked)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>COD Fee</label>
                        <input
                            type="number"
                            value={settings.codFee}
                            onChange={(e) =>
                                handleChange("codFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="toggle-group">
                        <span>Online Payment</span>
                        <input
                            type="checkbox"
                            checked={settings.onlinePaymentEnabled}
                            onChange={(e) =>
                                handleChange(
                                    "onlinePaymentEnabled",
                                    e.target.checked
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Bank Name</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Bank Account Number</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Holder Name</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>IFSC Code</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>UPI Id</label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) =>
                                handleChange("platformFee", e.target.value)
                            }
                        />
                    </div>

                </div>

            </div>

            <div className="save-section">
                <button className="save-btn">
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default StoreSettings;