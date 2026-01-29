import "./ProductDetails.css";

import logo from "../../assets/product_2.png"

const thumbnails = [
    logo,
    logo,
    logo,
];

const ProductGallery = () => {
    return (
        <div className="gallery">
                   <div className="thumbnail-row">
                {thumbnails.map((img, index) => (
                    <img key={index} src={img} alt="thumb" />
                ))}
            </div>

            <img
                src={logo}
                alt="Traditional Thekua"
                className="main-image"
            />
     
        </div>
    );
};

export default ProductGallery;
