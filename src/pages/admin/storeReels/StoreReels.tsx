import { useEffect, useState } from "react";
import "./StoreReels.css";
import AddReelDialog from "./AddReelDialog";

import type { StoreReelData } from "../../../models/admin/storeReels/response/StoreReelData";
import { useAdminStoreReels } from "../../../hooks/admin/adminStoreReels/useAdminStoreReels";
import { useAdminDeleteStoreReel } from "../../../hooks/admin/adminStoreReels/useAdminDeleteStoreReel";

declare global {
    interface Window {
        instgrm?: {
            Embeds?: {
                process: () => void;
            };
        };
    }
}

const StoreReels = () => {

    const [showDialog, setShowDialog] =
        useState(false);

    const [selectedReel, setSelectedReel] =
        useState<StoreReelData | null>(null);

    const {
        loading,
        error,
        reels,
        fetchReels
    } = useAdminStoreReels();

    const {
        loading: deleting,
        removeReel
    } = useAdminDeleteStoreReel();

    useEffect(() => {

        fetchReels();

    }, []);

    useEffect(() => {

        const existingScript =
            document.querySelector(
                'script[src="https://www.instagram.com/embed.js"]'
            );

        if (!existingScript) {

            const script =
                document.createElement("script");

            script.src =
                "https://www.instagram.com/embed.js";

            script.async = true;

            script.onload = () => {
                window.instgrm
                    ?.Embeds
                    ?.process();
            };

            document.body.appendChild(
                script
            );

        } else {

            window.instgrm
                ?.Embeds
                ?.process();
        }

    }, [reels]);

    const handleDelete = async (
        reelId: string
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this reel?"
            );

        if (!confirmed) return;

        const success =
            await removeReel(
                reelId
            );

        if (success) {

            fetchReels();
        }
    };

    return (
        <section className="reels-section">

            <AddReelDialog
                isOpen={showDialog}
                editMode={
                    selectedReel !== null
                }
                initialData={
                    selectedReel
                }
                onClose={() => {

                    setShowDialog(false);

                    setSelectedReel(null);
                }}
                onSave={() => {

                    setShowDialog(false);

                    setSelectedReel(null);

                    fetchReels();
                }}
            />

            <div className="admin-reels-title-box">

                <div className="admin-reels-title">
                    Instagram Reels
                </div>

                <div
                    className="admin-add-reels"
                    onClick={() => {

                        setSelectedReel(null);

                        setShowDialog(true);
                    }}
                >
                    Add Reel +
                </div>

            </div>

            {loading && (
                <div className="reels-loading">
                    Loading reels...
                </div>
            )}

            {error && (
                <div className="reels-error">
                    {error}
                </div>
            )}

            {!loading &&
                reels.length === 0 && (
                    <div className="reels-empty">
                        No reels found
                    </div>
                )}

            <div className="reels-grid">

                {reels.map((reel) => (

                    <div
                        key={reel.reelId}
                        className="reel-card"
                    >

                        <div className="reel-actions">

                            <button
                                className="reel-edit-btn"
                                onClick={() => {

                                    setSelectedReel(
                                        reel
                                    );

                                    setShowDialog(
                                        true
                                    );
                                }}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                className="reel-delete-btn"
                                disabled={
                                    deleting
                                }
                                onClick={() =>
                                    handleDelete(
                                        reel.reelId
                                    )
                                }
                            >
                                {
                                    deleting
                                        ? "Deleting..."
                                        : "🗑 Delete"
                                }
                            </button>

                        </div>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: `
                                <blockquote
                                    class="instagram-media"
                                    data-instgrm-permalink="${reel.videoUrl}"
                                    data-instgrm-version="14">
                                </blockquote>
                            `
                            }}
                        />

                    </div>

                ))}

            </div>

        </section>
    );
};

export default StoreReels;