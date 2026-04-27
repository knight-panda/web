import { useEffect, useState } from "react";
import "./CarouselAdmin.css";
import AddCarouselDialog from "./AddCarouselDialog";
import { useDeleteStoreCarousel, useGetStoreCarousel } from "../../../hooks/store/useStoreCarousel";

const CarouselAdmin = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { removeStoreCarousel } = useDeleteStoreCarousel();
    const [editItem, setEditItem] = useState<any>(null);

    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { fetchStoreCarousel, loading, data, error } = useGetStoreCarousel();

    useEffect(() => {
        fetchStoreCarousel();
    }, []);

    const carousels = Array.isArray(data?.data) ? data.data : [];

    // delete handler
    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            setDeletingId(id);

            const res = await removeStoreCarousel(id);

            if (res.success) {
                fetchStoreCarousel(); // 🔥 refresh list
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

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
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setEditItem(item);
                                        setShowDialog(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(item.id)}
                                    disabled={deletingId === item.id}
                                >
                                    {deletingId === item.id ? "Deleting..." : "Delete"}
                                </button>
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
                <AddCarouselDialog
                    onClose={() => {
                        setShowDialog(false);
                        setEditItem(null);
                    }}
                    onSuccess={() => fetchStoreCarousel()}
                    editMode={!!editItem}
                    initialData={editItem}
                />
            )}
        </div>
    );
};

export default CarouselAdmin;