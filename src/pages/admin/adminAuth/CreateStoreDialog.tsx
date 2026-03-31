import React, { useState } from "react";
import "./CreateStoreDialog.css";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "../../../hooks/store/useStore";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";

interface Props {
    onClose: () => void;
}

const CreateStoreDialog: React.FC<Props> = ({ onClose }) => {
    const navigate = useNavigate();
    const { createStore } = useCreateStore();
    const { updateProfile } = useUpdateAdminProfile();

    const [storeName, setStoreName] = useState("");
    const [storeImage, setStoreImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [primaryColor, setPrimaryColor] = useState("#ff6b00");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");

    const [loading, setLoading] = useState(false);
    const [logoError, setLogoError] = useState<string | null>(null);

    const generateSlug = (name: string) =>
        name.toLowerCase().trim().replace(/\s+/g, "-");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Store name validation
        if (!storeName.trim()) {
            alert("Store name is required");
            return;
        }

        // ✅ Logo validation (MANDATORY)
        if (!storeImage) {
            setLogoError("Store logo is required");
            return;
        }

        try {
            setLoading(true);
            setLogoError(null);

            console.log(storeName);

            const storeSlug = generateSlug(storeName);

            // ✅ Upload logo first
            console.log("Uploading logo...");
            const uploadedUrl = await updateProfile(storeImage);

            console.log("Uploaded URL:", uploadedUrl);

            if (!uploadedUrl) {
                throw new Error("Logo upload failed");
            }

            const payload = {
                storeName,
                storeSlug,
                logo: uploadedUrl,
                domain: "",
                subdomain: storeSlug,
                currency: "INR",
                timezone: "Asia/Kolkata",
                primaryColor,
                secondaryColor,
                themeName: "default",
            };

            console.log("Final Payload:", payload);

            // ✅ Create store
            const res = await createStore(payload);

            if (res?.success) {
                navigate("/admin-dashboard", { replace: true });
                window.location.reload();
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
                {/* Header */}
                <div className="dialog-header">
                    <h2>Create Your Store</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="store-form">
                    {/* Store Name */}
                    <input
                        type="text"
                        placeholder="Store Name"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                    />

                    {/* Logo Upload */}
                    <div className="file-input">
                        <label>Store Logo (required)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setStoreImage(file);
                                    setPreview(URL.createObjectURL(file));
                                    setLogoError(null);
                                }
                            }}
                        />

                        {/* Error Message */}
                        {logoError && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {logoError}
                            </p>
                        )}
                    </div>

                    {/* Preview */}
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            style={{
                                width: 100,
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                    )}

                    {/* Colors */}
                    <div className="color-picker">
                        <label>Primary Color</label>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                    </div>

                    <div className="color-picker">
                        <label>Secondary Color</label>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="create-store-btn"
                        style={{ background: primaryColor }}
                        disabled={loading || !storeName || !storeImage}
                    >
                        {loading ? "Creating..." : "Create Store"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStoreDialog;