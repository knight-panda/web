import { useEffect, useRef, useState } from "react";
import "./MyProfile.css";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";
import { useUserUpdateProfile } from "../../../hooks/user/address/useUserUpdateProfile";

const MyProfile = () => {

    const {
        fetchUserData,
        updateProfileData,
        data,
        loading,
    } = useUserUpdateProfile();

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
                    await fetchUserData();

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

            await updateProfileData({
                name,
                profile: profileUrl,
            });

            setIsEditing(false);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-image-section">

                    <img
                        src={
                            profile ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                    />

                    {isEditing && (

                        <label className="profile-image-upload-btn">

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

                <div className="profile-info">

                    {isEditing ? (

                        <input
                            className="profile-edit-name-input"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    ) : (

                        <h2 className="profile-name">
                            {name}
                        </h2>
                    )}

                    <div className="profile-field">
                        <span>Email</span>
                        <p>{data?.data.email}</p>
                    </div>

                    <div className="profile-field">
                        <span>Phone</span>
                        <p>{data?.data.phone}</p>
                    </div>

                    {data?.data.area && (

                        <div className="profile-field">

                            <span>Current Address</span>

                            <p>
                                {data?.data.houseNo},
                                {" "}
                                {data?.data.area},
                                <br />

                                {data?.data.city},
                                {" "}
                                {data?.data.state}
                                {" - "}
                                {data?.data.pincode}
                            </p>

                        </div>
                    )}

                    <div className="profile-actions">

                        {isEditing ? (

                            <button
                                className="profile-save-btn"
                                onClick={handleUpdate}
                                disabled={
                                    loading ||
                                    uploading
                                }
                            >

                                {
                                    loading
                                        ? "Saving..."
                                        : "Save"
                                }

                            </button>

                        ) : (

                            <button
                                className="profile-edit-btn"
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

export default MyProfile;