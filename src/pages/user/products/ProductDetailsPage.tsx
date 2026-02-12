import ProductGallery from "../../../components/Product/ProductGallery";
import ProductInfo from "../../../components/Product/ProductInfo";
import "./ProductDetailsPage.css";
import Products from "./Products";

const ProductDetailsPage = () => {
  return (
    <div className="product-page">
      <div className="product-container">
        <ProductGallery />
        <ProductInfo />
      </div>
      <div className="pd-all-products">
        <Products />
      </div>

    </div>
  );
};

export default ProductDetailsPage;
