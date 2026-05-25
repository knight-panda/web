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

    return (

        <div className="store-dialog-wrapper">

            <div className="store-dialog">

                {/* Header */}
                <div className="dialog-header">

                    <h2>
                        Create Your Store
                    </h2>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="store-form"
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
                        className="store-description"
                    />

                    <p className="description-count">
                        {
                            storeDescription.length
                        }
                        /200
                    </p>

                    {/* Store Logo Upload */}
                    <div className="file-input">

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

                        <p className="upload-note">
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
                    <div className="file-input">

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

                    {/* Colors */}
                    <div className="color-picker">

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

                    <div className="color-picker">

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

                    {/* Submit */}
                    <button
                        type="submit"
                        className="create-store-btn"
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

            </div>

        </div>
    );
};

export default CreateStoreDialog;