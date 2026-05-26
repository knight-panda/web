import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../../components/Product/ProductCard";

import "./Products.css";

import { usePublicProducts } from "../../../hooks/user/usePublicStore";

import { useUserProducts } from "../../../hooks/user/products/useUserProducts";

type Props = {
  storeId: string;
};

const Products = ({ storeId }: Props) => {

  const navigate = useNavigate();

  // ================= PUBLIC API =================

  const {
    fetchProducts: fetchPublicProducts,
    data: publicData,
    loading: publicLoading,
    error: publicError,
  } = usePublicProducts();

  // ================= USER API =================

  const {
    fetchProducts: fetchUserProducts,
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserProducts();

  // ================= LOGIN CHECK =================

  const storeTokens = JSON.parse(
    localStorage.getItem(
      "storeTokens"
    ) || "{}"
  );

  const activeStoreId =
    localStorage.getItem(
      "activeStoreId"
    );

  const userToken =
    storeTokens[
    activeStoreId || ""
    ];

  // ================= FETCH =================

  useEffect(() => {

    if (!storeId) return;

    // logged in user
    if (userToken) {

      fetchUserProducts();

    }

    // public user
    else {

      fetchPublicProducts(
        storeId
      );
    }

  }, [storeId]);

  // ================= RESPONSE =================

  const data =
    userToken
      ? userData
      : publicData;

  const loading =
    userToken
      ? userLoading
      : publicLoading;

  const error =
    userToken
      ? userError
      : publicError;

  // ================= NAVIGATE =================

  const handleProductClick = (
    id: string
  ) => {

    navigate(`/product/${id}`);
  };

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="product">
        Loading products...
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {

    return (
      <div className="product">
        Error: {error}
      </div>
    );
  }

  // ================= EMPTY =================

  if (!data?.data?.length) {

    return (
      <div className="product">
        No products available
      </div>
    );
  }

  return (
    <div className="product">

      <div className="products-grid">

        {data.data.map(
          (product: any) => {

            return (

              <ProductCard
                key={product.id}

                id={product.id}

                title={product.name}

                description={
                  product.description
                }

                // image
                image={
                  product.imageThumbnail ||
                  product.imageUrls?.[0]
                }

                // variants
                variants={
                  product.variants || []
                }

                onProductClick={
                  handleProductClick
                }
              />
            );
          }
        )}

      </div>
    </div>
  );
};

export default Products;