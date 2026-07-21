import "./StoreSettings.css";
import { useEffect, useState } from "react";

import { useAdminStoreSettings }
    from "../../../hooks/admin/storeSettings/useAdminStoreSettings";
import type { AdminStoreSettingsRequest } from "../../../models/admin/storeSettings/request/AdminStoreSettingsRequest";

const StoreSettings = () => {

    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const {
        fetchStoreSettings,
        updateStoreSettings,
        loading,
        data,
    } = useAdminStoreSettings();

    const [settings, setSettings] =
        useState<AdminStoreSettingsRequest>({
            deliveryFee: 0,
            freeDeliveryAbove: 0,
            minimumOrderAmount: 0,
            packagingFee: 0,
            gstPercentage: 0,
            codEnabled: false,
            codFee: 0,
            onlinePaymentEnabled: false,
            bankName: "",
            accountHolderName: "",
            bankAccountNumber: "",
            ifscCode: "",
            isActive: true,
        });

    // HANDLE CHANGE
    const handleChange = (
        key: keyof AdminStoreSettingsRequest,
        value: any
    ) => {

        setHasChanges(true);

        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // FETCH SETTINGS
    useEffect(() => {

        const fetchData = async () => {

            try {

                const res =
                    await fetchStoreSettings();

                if (res?.data) {

                    setSettings({
                        deliveryFee:
                            res.data.deliveryFee || 0,

                        freeDeliveryAbove:
                            res.data.freeDeliveryAbove || 0,

                        minimumOrderAmount:
                            res.data.minimumOrderAmount || 0,

                        packagingFee:
                            res.data.packagingFee || 0,

                        gstPercentage:
                            res.data.gstPercentage || 0,

                        codEnabled:
                            res.data.codEnabled || false,

                        codFee:
                            res.data.codFee || 0,

                        onlinePaymentEnabled:
                            res.data.onlinePaymentEnabled || false,

                        bankName:
                            res.data.bankName || "",

                        accountHolderName:
                            res.data.accountHolderName || "",

                        bankAccountNumber:
                            res.data.bankAccountNumber || "",

                        ifscCode:
                            res.data.ifscCode || "",

                        isActive:
                            res.data.isActive || false,
                    });
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

    }, []);

    // UPDATE SETTINGS
    const handleSave = async () => {

        try {

            await updateStoreSettings(settings);

            setHasChanges(false);

            alert("Store settings updated successfully");

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className="settings-page">

            <div className="settings-header">
                <div className="sp-title">
                    Store Settings
                </div>

                <div className="sp-desc">
                    Manage your ecommerce store configuration
                </div>
            </div>

            {/* STORE PAYMENT */}
            <div className="settings-card">

                <h2>
                    Store Payment
                </h2>

                <div className="payment-summary">

                    <div className="payment-box">

                        <span>
                            Total Revenue
                        </span>

                        <h3>
                            ₹ {
                                Number(
                                    data?.data?.withdrawAmount ?? 0
                                ).toFixed(2)
                            }
                        </h3>

                    </div>

                    <div className="payment-box">

                        <span>
                            Withdraw Amount
                        </span>

                        <h3>
                            ₹ {
                                Number(
                                    data?.data?.withdrawAmount || 0
                                ).toFixed(2)
                            }
                        </h3>

                    </div>

                </div>

                <div className="withdraw-note">

                    {
                        data?.data?.withdrawNote ||
                        "Only online payment orders are eligible for withdrawal."
                    }

                </div>

            </div>

            <div className="save-section">

                <button
                    className={`save-btn ${!hasChanges ? "disabled-btn" : ""}`}
                    onClick={handleSave}
                    disabled={!hasChanges || loading}
                >
                    {
                        loading
                            ? "Updating..."
                            : "Update Settings"
                    }
                </button>

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
                                handleChange(
                                    "deliveryFee",
                                    Number(e.target.value)
                                )
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
                                    Number(e.target.value)
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
                                    Number(e.target.value)
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
                                handleChange(
                                    "packagingFee",
                                    Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>GST Percentage</label>

                        <input
                            type="number"
                            value={settings.gstPercentage}
                            onChange={(e) =>
                                handleChange(
                                    "gstPercentage",
                                    Number(e.target.value)
                                )
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
                                handleChange(
                                    "codEnabled",
                                    e.target.checked
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>COD Fee</label>

                        <input
                            type="number"
                            value={settings.codFee}
                            onChange={(e) =>
                                handleChange(
                                    "codFee",
                                    Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <div className="toggle-group">
                        <span>Online Payment</span>

                        <input
                            type="checkbox"
                            checked={
                                settings.onlinePaymentEnabled
                            }
                            onChange={(e) =>
                                handleChange(
                                    "onlinePaymentEnabled",
                                    e.target.checked
                                )
                            }
                        />
                    </div>

                </div>

                {/* BANK */}
                <div className="settings-card">

                    <h2>Bank Details</h2>

                    <div className="form-group">
                        <label>Bank Name</label>

                        <input
                            type="text"
                            value={settings.bankName}
                            onChange={(e) =>
                                handleChange(
                                    "bankName",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Holder Name</label>

                        <input
                            type="text"
                            value={settings.accountHolderName}
                            onChange={(e) =>
                                handleChange(
                                    "accountHolderName",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Bank Account Number</label>

                        <input
                            type="text"
                            value={settings.bankAccountNumber}
                            onChange={(e) =>
                                handleChange(
                                    "bankAccountNumber",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>IFSC Code</label>

                        <input
                            type="text"
                            value={settings.ifscCode}
                            onChange={(e) =>
                                handleChange(
                                    "ifscCode",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default StoreSettings;