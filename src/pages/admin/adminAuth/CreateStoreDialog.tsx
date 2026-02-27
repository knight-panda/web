import React, { useState } from "react";
import "./CreateStoreDialog.css";

interface Props {
    onClose: () => void;
}

const CreateStoreDialog: React.FC<Props> = ({ onClose }) => {
    const [storeName, setStoreName] = useState("");
    const [storeImage, setStoreImage] = useState<File | null>(null);
    const [ownerName, setOwnerName] = useState("");
    const [ownerImage, setOwnerImage] = useState<File | null>(null);
    const [ownerEmail, setOwnerEmail] = useState("");
    const [description, setDescription] = useState("");
    const [themeColor, setThemeColor] = useState("#ff6b00");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            storeName,
            storeImage,
            ownerName,
            ownerImage,
            ownerEmail,
            description,
            themeColor,
        });
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
                        <label>Store Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setStoreImage(e.target.files?.[0] || null)}
                            required
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Store Owner Name"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                    />

                    <div className="file-input">
                        <label>Owner Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setOwnerImage(e.target.files?.[0] || null)}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Owner Email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Store Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                    />

                    <div className="color-picker">
                        <label>Store Theme Color</label>
                        <input
                            type="color"
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="create-store-btn"
                        style={{ background: themeColor }}
                    >
                        Create Store
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStoreDialog;