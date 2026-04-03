import React, { useEffect, useState } from "react";
import "./CarouselAdmin.css";
import AddCarouselDialog from "./AddCarouselDialog";
import { useGetStoreCarousel } from "../../../hooks/store/useStoreCarousel";

const CarouselAdmin = () => {
    const [showDialog, setShowDialog] = useState(false);

    const { fetchStoreCarousel, loading, data, error } = useGetStoreCarousel();

    useEffect(() => {
        fetchStoreCarousel();
    }, []);

    const carousels = Array.isArray(data?.data) ? data.data : [];

    return (
        <div className="carousel-admin">
            <div className="ca-header">
                <div className="ca-header-title">Carousel Management</div>
                <button className="ca-add-carousel" onClick={() => setShowDialog(true)}>
                    + Add Carousel
                </button>
            </div>

            {/* Error */}
            {error && <p className="error-text">{error}</p>}

            <div className="carousel-grid">

                {/* ✅ Shimmer */}
                {loading && (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div className="ca-card shimmer-card" key={`shimmer-${index}`}>
                            <div className="shimmer-img"></div>
                        </div>
                    ))
                )}

                {/* ✅ Real Data */}
                {!loading && carousels.length > 0 && (
                    carousels.map((item, index) => (
                        <div className="ca-card" key={item.id ?? `carousel-${index}`}>
                            <img
                                src={item.imageUrl}
                                alt={item.title || "carousel"}
                                className="ca-card-image"
                                onError={(e) =>
                                ((e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/300")
                                }
                            />

                            <div className="ca-overlay">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                )}

                {/* ✅ Empty State */}
                {!loading && carousels.length === 0 && (
                    <div className="empty-state">
                        <p>No carousel data found</p>
                    </div>
                )}

            </div>

            {showDialog && (
                <AddCarouselDialog onClose={() => setShowDialog(false)} />
            )}
        </div>
    );
};

export default CarouselAdmin;