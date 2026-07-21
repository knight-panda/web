import { useEffect } from "react";
import "./ReelsUser.css";
import { useUserStoreReels } from "../../../hooks/user/storeReels/useUserStoreReels";

declare global {
    interface Window {
        instgrm?: {
            Embeds?: {
                process: () => void;
            };
        };
    }
}

interface Props {
    storeId: string;
}

const ReelsUser = ({
    storeId
}: Props) => {

    const {
        loading,
        error,
        reels,
        fetchReels
    } = useUserStoreReels();

    useEffect(() => {

        if (storeId) {

            fetchReels(
                storeId
            );
        }

    }, [storeId]);

    useEffect(() => {

        const existingScript =
            document.querySelector(
                'script[src="https://www.instagram.com/embed.js"]'
            );

        if (!existingScript) {

            const script =
                document.createElement(
                    "script"
                );

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

    if (
        !loading &&
        reels.length === 0
    ) {

        return null;
    }

    return (
        <section className="user-reels-section">

            <div className="user-reels-header">

                <h2 className="user-reels-header-title">
                    Our Customer Reviews
                </h2>

            </div>

            {loading && (
                <div className="user-reels-loading">
                    Loading reels...
                </div>
            )}

            {error && (
                <div className="user-reels-error">
                    {error}
                </div>
            )}

            <div className="user-reels-grid">

                {reels.map(
                    (reel) => (

                        <div
                            key={reel.reelId}
                            className="user-reel-card"
                        >

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
                    )
                )}

            </div>

        </section>
    );
};

export default ReelsUser;