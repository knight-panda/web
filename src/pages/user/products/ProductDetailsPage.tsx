import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductGallery from "../../../components/Product/ProductGallery";
import ProductInfo from "../../../components/Product/ProductInfo";
import "./ProductDetailsPage.css";
import { usePublicProductDetails } from "../../../hooks/user/usePublicProductDetails";
import { useOutletContext } from "react-router-dom";
// import Products from "./Products";

type OutletContextType = {
  storeId: string;
  store: any; // replace with proper type if available
};

const ProductDetailsPage = () => {
  const { storeId } = useOutletContext<OutletContextType>();

  const { productId } = useParams();

  const {
    fetchProductDetails,
    data,
    loading,
    error,
  } = usePublicProductDetails();

  useEffect(() => {

    if (storeId && productId) {
      fetchProductDetails(storeId, productId);
    }

  }, [storeId, productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data?.data) {
    return <p>Product not found</p>;
  }

  const product = data.data;

  return (
    <div className="product-page">

      <div className="product-container">

        <ProductGallery product={product} />

        <ProductInfo product={product} />

      </div>

      <div className="pd-all-products">
        {/* <Products /> */}
      </div>

    </div>
  );
};

export default ProductDetailsPage;