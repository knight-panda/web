import { useEffect, useState } from "react";
import "./AddReelDialog.css";

import { useAdminCreateStoreReel } from "../../../hooks/admin/adminStoreReels/useAdminCreateStoreReel";
import { useAdminUpdateStoreReel } from "../../../hooks/admin/adminStoreReels/useAdminUpdateStoreReel";
import type { StoreReelData } from "../../../models/admin/storeReels/response/StoreReelData";
import type { AdminStoreReelRequest } from "../../../models/admin/storeReels/request/AdminStoreReelRequest";

interface AddReelDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    editMode?: boolean;
    initialData?: StoreReelData | null;
}

const AddReelDialog = ({
    isOpen,
    onClose,
    onSave,
    editMode = false,
    initialData
}: AddReelDialogProps) => {

    const [title, setTitle] =
        useState("");

    const [videoUrl, setVideoUrl] =
        useState("");

    const {
        createReel,
        loading: creating
    } = useAdminCreateStoreReel();

    const {
        updateReel,
        loading: updating
    } = useAdminUpdateStoreReel();

    useEffect(() => {

        if (!isOpen) return;

        setTitle(
            initialData?.title ?? ""
        );

        setVideoUrl(
            initialData?.videoUrl ?? ""
        );

    }, [isOpen, initialData]);

    const handleSave = async () => {

        if (
            !title.trim() ||
            !videoUrl.trim()
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            const request:
                AdminStoreReelRequest = {

                title,
                videoUrl
            };

            let response;

            if (
                editMode &&
                initialData
            ) {

                response =
                    await updateReel(
                        initialData.reelId,
                        request
                    );

            } else {

                response =
                    await createReel(
                        request
                    );
            }

            if (
                response?.success
            ) {

                setTitle("");
                setVideoUrl("");

                onSave();

            } else {

                alert(
                    response?.message ||
                    "Operation failed"
                );
            }

        } catch (error) {

            console.error(
                error
            );

            alert(
                editMode
                    ? "Failed to update reel"
                    : "Failed to create reel"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className="reel-dialog-overlay">

            <div className="reel-dialog">

                <div className="reel-dialog-header">

                    <h2>
                        {
                            editMode
                                ? "Edit Reel"
                                : "Add Reel"
                        }
                    </h2>

                    <button
                        className="reel-close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="reel-dialog-content">

                    <div className="reel-form-group">

                        <label>
                            Reel Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            placeholder="Enter reel title"
                        />

                    </div>

                    <div className="reel-form-group">

                        <label>
                            Instagram Reel URL
                        </label>

                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) =>
                                setVideoUrl(
                                    e.target.value
                                )
                            }
                            placeholder="https://www.instagram.com/reel/..."
                        />

                    </div>

                </div>

                <div className="reel-dialog-footer">

                    <button
                        className="reel-cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="reel-save-btn"
                        onClick={
                            handleSave
                        }
                        disabled={
                            creating ||
                            updating
                        }
                    >
                        {
                            creating ||
                                updating
                                ? (
                                    editMode
                                        ? "Updating..."
                                        : "Saving..."
                                )
                                : (
                                    editMode
                                        ? "Update Reel"
                                        : "Save Reel"
                                )
                        }
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AddReelDialog;