import React, { useState } from "react";
import "./CreateStoreDialog.css";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "../../../hooks/store/useStore";

interface Props {
    onClose: () => void;
}

const CreateStoreDialog: React.FC<Props> = ({ onClose }) => {
    const navigate = useNavigate();
    const { createStore } = useCreateStore();

    const [storeName, setStoreName] = useState("");
    // const [storeImage, setStoreImage] = useState<File | null>(null);
    const [primaryColor, setPrimaryColor] = useState("#ff6b00");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");
    const [loading, setLoading] = useState(false);

    const generateSlug = (name: string) =>
        name.toLowerCase().trim().replace(/\s+/g, "-");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeName.trim()) {
            alert("Store name is required");
            return;
        }

        try {
            setLoading(true);

            const storeSlug = generateSlug(storeName);

            // ✅ Dummy image
            const logoUrl = "https://via.placeholder.com/150?text=Store+Logo";

            const payload = {
                storeName,
                storeSlug,
                logo: logoUrl,
                domain: "", // ✅ send empty (since not using now)
                subdomain: storeSlug,
                currency: "INR",
                timezone: "Asia/Kolkata",
                primaryColor,
                secondaryColor,
                themeName: "default",
            };

            console.log("Final Payload:", payload);

            const res = await createStore(payload);

            if (res?.success) {
                navigate("/admin/dashboard");
            } else {
                alert("Failed to create store");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="store-dialog-wrapper">
            <div className="store-dialog">
                <div className="dialog-header">
                    <h2>Create Your Store</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="store-form">
                    <input
                        type="text"
                        placeholder="Store Name"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                    />

                    <div className="file-input">
                        <label>Store Logo (optional for now)</label>
                        <input
                            type="file"
                            accept="image/*"
                            // onChange={(e) =>
                            //     setStoreImage(e.target.files?.[0] || null)
                            // }
                        />
                    </div>

                    <div className="color-picker">
                        <label>Store Primary Color</label>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                    </div>

                    <div className="color-picker">
                        <label>Store Secondary Color</label>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="create-store-btn"
                        style={{ background: primaryColor }}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Store"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStoreDialog;