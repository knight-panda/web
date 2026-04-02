import React, { useState } from "react";
import "./CarouselAdmin.css";
import AddCarouselDialog from "./AddCarouselDialog";

const CarouselAdmin = () => {
    const [showDialog, setShowDialog] = useState(false);

    // Dummy Data (Design only)
    const carousels = [
        {
            id: 1,
            title: "Summer Sale",
            image_url: "https://www.aicarousels.com/img/templates/2.png",
            redirect_type: "PRODUCT",
            is_active: true,
        },
        {
            id: 2,
            title: "New Arrivals",
            image_url: "https://www.aicarousels.com/img/templates/2.png",
            redirect_type: "CATEGORY",
            is_active: false,
        },
        {
            id: 3,
            title: "New Arrivals",
            image_url: "https://www.aicarousels.com/img/templates/2.png",
            redirect_type: "CATEGORY",
            is_active: false,
        },
    ];

    return (
        <div className="carousel-admin">
            <div className="ca-header">
                <div className="ca-header-title">Carousel Management</div>
                <button className="ca-add-carousel" onClick={() => setShowDialog(true)}>
                    + Add Carousel
                </button>
            </div>

            <div className="carousel-grid">
                {carousels.map((item, index) => (
                    <div className="ca-card" key={index}>
                        <img src={item.image_url} alt="carousel" />

                        <div className="ca-overlay">
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showDialog && (
                <AddCarouselDialog onClose={() => setShowDialog(false)} />
            )}
        </div>
    );
};

export default CarouselAdmin;