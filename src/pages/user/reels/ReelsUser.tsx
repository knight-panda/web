import { useEffect } from "react";
import "./ReelsUser.css";

declare global {
    interface Window {
        instgrm?: {
            Embeds?: {
                process: () => void;
            };
        };
    }
}

interface ReelModel {
    reelId: string;
    title: string;
    url: string;
}

const reels: ReelModel[] = [
    {
        reelId: "1",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZAzvfDP84Y/"
    },
    {
        reelId: "2",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZCib0ZP77m/"
    },
    {
        reelId: "1",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZAzvfDP84Y/"
    },
    {
        reelId: "2",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZCib0ZP77m/"
    },
    {
        reelId: "1",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZAzvfDP84Y/"
    },
    {
        reelId: "2",
        title: "How We Make Leather Wallets",
        url: "https://www.instagram.com/reel/DZCib0ZP77m/"
    }
];

export default function ReelsUser() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;

        script.onload = () => {
            window.instgrm?.Embeds?.process();
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [reels]);

    return (
        <section className="reels-section">
            <div className="reels-header">
                <h2>Instagram Reels</h2>
            </div>

            <div className="reels-grid">
                {reels.map((reel) => (
                    <div
                        key={reel.reelId}
                        className="reel-card"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `
            <blockquote
                class="instagram-media"
                data-instgrm-permalink="${reel.url}"
                data-instgrm-version="14">
            </blockquote>
        `
                            }}
                        />
                        <div className="reel-title">
                            {reel.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}