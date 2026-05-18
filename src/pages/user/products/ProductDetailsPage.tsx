import { useEffect } from "react";
import {
  useOutletContext,
  useParams,
} from "react-router-dom";

import ProductGallery from "../../../components/Product/ProductGallery";
import ProductInfo from "../../../components/Product/ProductInfo";
import "./ProductDetailsPage.css";
import { usePublicProductDetails } from "../../../hooks/user/usePublicProductDetails";
import { useUserProductDetails } from "../../../hooks/user/products/useUserProductDetails";

// import Products from "./Products";
type OutletContextType = {
  storeId: string;
  store: any;
};

const ProductDetailsPage = () => {

  const { storeId } =
    useOutletContext<OutletContextType>();

  const { productId } = useParams();

  // PUBLIC PRODUCT
  const {
    fetchProductDetails:
    fetchPublicProductDetails,
    data: publicData,
    loading: publicLoading,
    error: publicError,
  } = usePublicProductDetails();

  // USER PRODUCT
  const {
    fetchProductDetails:
    fetchUserProductDetails,
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserProductDetails();

  // active store token
  const storeTokens = JSON.parse(
    localStorage.getItem("storeTokens") || "{}"
  );

  const activeStoreId =
    localStorage.getItem("activeStoreId");

  const userToken =
    storeTokens[activeStoreId || ""];

  useEffect(() => {

    if (!productId) return;

    // if logged in
    if (userToken) {

      fetchUserProductDetails(productId);

    } else if (storeId) {

      // public api
      fetchPublicProductDetails(
        storeId,
        productId
      );
    }

  }, [storeId, productId]);

  // loading
  if (publicLoading || userLoading) {
    return <p>Loading...</p>;
  }

  // error
  if (publicError || userError) {
    return (
      <p>
        {publicError || userError}
      </p>
    );
  }

  // final product
  const product =
    userData?.data ||
    publicData?.data;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-page">

      <div className="product-container">

        <ProductGallery
          product={product}
        />

        <ProductInfo
          product={product}
        />

      </div>

      <div className="pd-all-products">
        {/* <Products /> */}
      </div>

    </div>
  );
};

export default ProductDetailsPage;