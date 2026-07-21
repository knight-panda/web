import { useState } from "react";

import "./ProductDetails.css";

import type { Product } from "../../models/user/public/response/PublicProductsResponse";
import type { Store } from "../../models/store/response/SingleStoreResponse";

interface ProductGalleryProps {
    product: Product;
    storeData: Store
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product, storeData }) => {

    const images = [
        product.imageThumbnail,
        ...(product.imageUrls || []),
    ].filter(Boolean);

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div
            className="gallery"
            style={{
                "--store-primary-color": storeData.primaryColor || "var(--primary-color)"
            } as React.CSSProperties}>

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