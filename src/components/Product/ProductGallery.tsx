import { useState } from "react";

import "./ProductDetails.css";

import type { Product } from "../../models/user/public/response/PublicProductsResponse";

interface ProductGalleryProps {
    product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {

    const images = [
        product.imageThumbnail,
        ...(product.imageUrls || []),
    ].filter(Boolean);

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="gallery">

            <div className="thumbnail-row">

                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`thumb-${index}`}
                        className={
                            selectedImage === img
                                ? "thumbnail active"
                                : "thumbnail"
                        }
                        onClick={() => setSelectedImage(img)}
                    />
                ))}

            </div>

            <img
                src={selectedImage}
                alt={product.name}
                className="main-image"
            />

        </div>
    );
};

export default ProductGallery;