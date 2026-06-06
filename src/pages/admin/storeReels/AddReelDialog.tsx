import React, { useState } from "react";
import "./AddReelDialog.css";

interface ReelModel {
    reelId: string;
    title: string;
    videoUrl: string;
}

interface AddReelDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (reel: ReelModel) => void;
}

const AddReelDialog = ({
    isOpen,
    onClose,
    onSave
}: AddReelDialogProps) => {

    const [title, setTitle] =
        useState("");

    const [videoUrl, setVideoUrl] =
        useState("");

    const handleVideoSelect = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        if (
            !file.type.startsWith(
                "video/"
            )
        ) {

            alert(
                "Please select a valid video"
            );

            return;
        }

        setVideoUrl(
            URL.createObjectURL(file)
        );
    };

    const handleSave = () => {

        if (
            !title.trim() ||
            !videoUrl
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        onSave({
            reelId:
                crypto.randomUUID(),
            title,
            videoUrl
        });

        setTitle("");
        setVideoUrl("");

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="reel-dialog-overlay">

            <div className="reel-dialog">

                <div className="reel-dialog-header">

                    <h2>
                        Add Reel
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
                            Video
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
                        onClick={handleSave}
                    >
                        Save Reel
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AddReelDialog;