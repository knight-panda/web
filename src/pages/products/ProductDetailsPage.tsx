import ProductGallery from "../../components/Product/ProductGallery";
import ProductInfo from "../../components/Product/ProductInfo";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  return (
    <div className="product-page">
      <div className="product-container">
        <ProductGallery />
        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
