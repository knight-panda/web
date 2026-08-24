import React, { useState } from "react";
import "./StoreProfile.css";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "../../../hooks/store/useStore";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";

interface Props {
    onClose: () => void;
}

const StoreProfile: React.FC<Props> = () => {

    const navigate = useNavigate();

    const { createStore } = useCreateStore();
    const { updateProfile } = useUpdateAdminProfile();

    const [storeName, setStoreName] = useState("");
    const [storeDescription, setStoreDescription] = useState("");

    // Store Logo
    const [storeImage, setStoreImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState<string | null>(null);

    // Favicon
    const [faviconImage, setFaviconImage] =
        useState<File | null>(null);

    const [faviconPreview, setFaviconPreview] =
        useState<string | null>(null);

    const [primaryColor, setPrimaryColor] =
        useState("#ff6b00");

    const [secondaryColor, setSecondaryColor] =
        useState("#ffffff");

    const [loading, setLoading] = useState(false);

    const [logoError, setLogoError] =
        useState<string | null>(null);

    const generateSlug = (name: string) =>
        name.toLowerCase().trim().replace(/\s+/g, "-");

    const validateImage = (file: File) => {

        // only images
        if (!file.type.startsWith("image/")) {

            alert("Please upload a valid image");

            return false;
        }

        // 7MB limit
        const maxSize = 7 * 1024 * 1024;

        if (file.size > maxSize) {

            alert("Image size must be less than 7MB");

            return false;
        }

        return true;
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!storeName.trim()) {
            alert("Store name is required");
            return;
        }

        if (!storeImage) {
            setLogoError("Store logo is required");
            return;
        }

        try {

            setLoading(true);
            setLogoError(null);

            const storeSlug =
                generateSlug(storeName);

            // Upload Store Logo
            const uploadedLogoUrl =
                await updateProfile(storeImage);

            if (!uploadedLogoUrl) {
                throw new Error(
                    "Store logo upload failed"
                );
            }

            // Upload Favicon
            let uploadedFaviconUrl =
                uploadedLogoUrl;

            if (faviconImage) {

                uploadedFaviconUrl =
                    await updateProfile(
                        faviconImage
                    );
            }

            const payload = {

                storeName,
                storeDescription,

                storeSlug,

                logoUrl: uploadedLogoUrl,

                faviconUrl:
                    uploadedFaviconUrl,

                domain: "",

                subdomain: storeSlug,

                currency: "INR",

                timezone: "Asia/Kolkata",

                primaryColor,

                secondaryColor,

                themeName: "default",
            };

            console.log(
                "Store Payload:",
                payload
            );

            const res =
                await createStore(payload);

            if (res?.success) {

                navigate(
                    "/admin-dashboard",
                    {
                        replace: true
                    }
                );

                window.location.reload();

            } else {

                alert(
                    "Failed to create store"
                );
            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong");

        } finally {

            setLoading(false);
        }
    };

    const presetColors = [
        "#FF6B00",
        "#FF3B30",
        "#FF9500",
        "#FFCC00",
        "#34C759",
        "#30D158",
        "#00C7BE",
        "#32ADE6",
        "#007AFF",
        "#5856D6",
        "#AF52DE",
        "#FF2D55",
        "#000000",
        "#1C1C1E",
        "#3A3A3C",
        "#8E8E93",
        "#FFFFFF",
        "#F2F2F7",
        "#E5E5EA",
        "#D1D1D6",
        "#8B4513",
        "#A0522D",
        "#CD853F",
        "#D2691E",
        "#DC143C",
        "#B22222",
        "#800000",
        "#4B0082",
        "#6A0DAD",
        "#483D8B",
        "#008080",
        "#20B2AA",
        "#228B22",
        "#2E8B57",
        "#006400",
        "#FFD700",
        "#DAA520",
        "#FFA500",
        "#FF8C00",
        "#FF6347",
        "#4682B4",
        "#5F9EA0",
        "#6495ED",
        "#4169E1",
        "#7B68EE",
        "#9932CC",
        "#C71585",
        "#E91E63",
        "#795548",
        "#607D8B"
    ];

    return (

        <div className="store-profile-wrapper">

            <div className="store-profile">

                {/* Header */}
                <div className="store-profile-header">

                    <h2>
                        Create Your Store
                    </h2>

                </div>

                <div className="store-profile-grid">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="store-profile-form"
                    >

                        {/* Store Name */}
                        <input
                            type="text"
                            placeholder="Store Name"
                            value={storeName}
                            onChange={(e) =>
                                setStoreName(
                                    e.target.value
                                )
                            }
                            required
                        />

                        {/* Description */}
                        <textarea
                            placeholder="Store Description"
                            value={
                                storeDescription
                            }
                            onChange={(e) =>
                                setStoreDescription(
                                    e.target.value
                                )
                            }
                            rows={4}
                            maxLength={200}
                            className="store-profile-description"
                        />

                        <p className="store-profile-description-count">
                            {
                                storeDescription.length
                            }
                            /200
                        </p>

                        {/* Store Logo Upload */}
                        <div className="store-profile-file-input">

                            <label>
                                Store Logo
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {

                                    const file =
                                        e.target.files?.[0];

                                    if (!file) return;

                                    const isValid =
                                        validateImage(file);

                                    if (!isValid) {

                                        e.target.value = "";

                                        return;
                                    }

                                    setStoreImage(file);

                                    setPreview(
                                        URL.createObjectURL(file)
                                    );

                                    setLogoError(null);
                                }}
                            />

                            <p className="store-profile-upload-note">
                                Recommended:
                                transparent or
                                rectangle logo
                            </p>

                            {logoError && (
                                <p className="logo-error">
                                    {logoError}
                                </p>
                            )}

                        </div>

                        {/* Favicon Upload */}
                        <div className="store-profile-file-input">

                            <label>
                                Favicon Icon
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {

                                    const file =
                                        e.target.files?.[0];

                                    if (!file) return;

                                    const isValid =
                                        validateImage(file);

                                    if (!isValid) {

                                        e.target.value = "";

                                        return;
                                    }

                                    setFaviconImage(file);

                                    setFaviconPreview(
                                        URL.createObjectURL(file)
                                    );
                                }}
                            />

                            <p className="upload-note">
                                Recommended:
                                square 1:1 icon
                            </p>

                        </div>

                        {/* Preview */}
                        <div className="logo-preview-wrapper">

                            {/* Store Logo */}
                            {preview && (

                                <div>

                                    <p className="preview-title">
                                        Store Logo
                                    </p>

                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="store-logo-preview"
                                    />

                                </div>
                            )}

                            {/* Favicon */}
                            {(faviconPreview ||
                                preview) && (

                                    <div>

                                        <p className="preview-title">
                                            Favicon
                                        </p>

                                        <div className="favicon-preview-box">

                                            <img
                                                src={
                                                    faviconPreview ||
                                                    preview ||
                                                    ""
                                                }
                                                alt="favicon"
                                                className="favicon-preview"
                                            />

                                        </div>

                                    </div>
                                )}

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="store-profile-create-store-btn"
                            style={{
                                background:
                                    primaryColor
                            }}
                            disabled={
                                loading ||
                                !storeName ||
                                !storeImage
                            }
                        >
                            {loading
                                ? "Creating..."
                                : "Create Store"}
                        </button>

                    </form>

                    <div className="theme-color-layout">

                        <div className="theme-colors">

                            {/* Colors */}
                            <div className="store-profile-color-picker">

                                <label>
                                    Primary Color
                                </label>

                                <input
                                    type="color"
                                    value={
                                        primaryColor
                                    }
                                    onChange={(e) =>
                                        setPrimaryColor(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="store-profile-color-picker">

                                <label>
                                    Secondary Color
                                </label>

                                <input
                                    type="color"
                                    value={
                                        secondaryColor
                                    }
                                    onChange={(e) =>
                                        setSecondaryColor(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <p>Theme Primary Colors</p>

                            <div className="color-grid">

                                {presetColors.map((color) => (

                                    <button
                                        key={color}
                                        type="button"
                                        className="color-box"
                                        style={{
                                            backgroundColor: color
                                        }}
                                        onClick={() => {

                                            if (
                                                window.confirm(
                                                    "Set as Primary Color?"
                                                )
                                            ) {

                                                setPrimaryColor(color);

                                            } else {

                                                setSecondaryColor(color);

                                            }
                                        }}
                                    />

                                ))}

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};


export default StoreProfile