import { useEffect, useRef, useState } from "react";
import "./AdminProfile.css";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";
import { useAdminProfile } from "../../../hooks/admin/auth/useAdminProfile";

const AdminProfile = () => {

    const {
        fetchAdminProfile,
        updateAdminProfile,
        data,
        adminProfileloading,
    } = useAdminProfile();

    // ⭐ image upload api hook
    const {
        updateProfile,
    } = useUpdateAdminProfile();

    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");

    // ⭐ store original uploaded url
    const [profileUrl, setProfileUrl] =
        useState("");

    const [isEditing, setIsEditing] =
        useState(false);

    const [uploading, setUploading] =
        useState(false);

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);

    // fetch profile data
    useEffect(() => {

        const fetchData = async () => {

            try {

                const res =
                    await fetchAdminProfile();

                setName(res.data.name || "");

                setProfile(
                    res.data.profile || ""
                );

                setProfileUrl(
                    res.data.profile || ""
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchData();

    }, []);

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        try {

            const file =
                e.target.files?.[0];

            if (!file) return;

            // allow only images
            if (!file.type.startsWith("image/")) {

                alert("Please upload a valid image");

                return;
            }

            // 7MB limit
            const maxSize = 7 * 1024 * 1024;

            if (file.size > maxSize) {

                alert("Image size must be less than 7MB");

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                return;
            }

            setUploading(true);

            const uploadedUrl =
                await updateProfile(file);

            if (uploadedUrl) {

                // ⭐ force refresh image
                const updatedImage =
                    `${uploadedUrl}?t=${Date.now()}`;

                setProfile(updatedImage);

                setProfileUrl(uploadedUrl);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleUpdate = async () => {

        try {

            await updateAdminProfile({
                name,
                profile: profileUrl,
            });

            setIsEditing(false);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="admin-profile-page">

            <div className="admin-profile-card">

                <div className="admin-profile-image-section">

                    <img
                        src={
                            profile ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Profile"
                        className="admin-profile-image"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                    />

                    {isEditing && (

                        <label className="admin-profile-image-upload-btn">

                            {
                                uploading
                                    ? "Uploading..."
                                    : "Change Photo"
                            }

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />

                        </label>
                    )}

                </div>

                <div className="admin-profile-info">

                    {isEditing ? (

                        <input
                            className="admin-profile-edit-name-input"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    ) : (

                        <h2 className="admin-profile-name">
                            {name}
                        </h2>
                    )}

                    <div className="admin-profile-field">
                        <span>Email</span>
                        <p>{data?.data.email}</p>
                    </div>

                    <div className="admin-profile-field">
                        <span>Phone</span>
                        <p>{data?.data.phone}</p>
                    </div>

                    <div className="admin-profile-actions">

                        {isEditing ? (

                            <button
                                className="admin-profile-save-btn"
                                onClick={handleUpdate}
                                disabled={
                                    adminProfileloading ||
                                    uploading
                                }
                            >

                                {
                                    adminProfileloading
                                        ? "Saving..."
                                        : "Save"
                                }

                            </button>

                        ) : (

                            <button
                                className="admin-profile-edit-btn"
                                onClick={() =>
                                    setIsEditing(true)
                                }
                            >
                                Update Profile
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminProfile;