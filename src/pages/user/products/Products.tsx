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

  // ✅ public api
  const {
    fetchProducts: fetchPublicProducts,
    data: publicData,
    loading: publicLoading,
    error: publicError,
  } = usePublicProducts();

  // ✅ user api
  const {
    fetchProducts: fetchUserProducts,
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserProducts();

  // ✅ detect login
  const storeTokens = JSON.parse(
    localStorage.getItem("storeTokens") || "{}"
  );

  const activeStoreId =
    localStorage.getItem("activeStoreId");

  const userToken =
    storeTokens[activeStoreId || ""];

  // ✅ fetch correct api
  useEffect(() => {

    if (!storeId) return;

    // logged in user
    if (userToken) {

      fetchUserProducts();

    }

    // public user
    else {

      fetchPublicProducts(storeId);
    }

  }, [storeId]);

  // ✅ choose correct response
  const data =
    userToken ? userData : publicData;

  const loading =
    userToken ? userLoading : publicLoading;

  const error =
    userToken ? userError : publicError;

  // ✅ navigate product
  const handleProductClick = (
    id: string
  ) => {

    navigate(`/product/${id}`);
  };

  // loading
  if (loading) {
    return (
      <div className="product">
        Loading products...
      </div>
    );
  }

  // error
  if (error) {
    return (
      <div className="product">
        Error: {error}
      </div>
    );
  }

  // no products
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

        {data.data.map((product: any) => (

          <ProductCard
            key={product.id}

            id={product.id}

            title={product.name}

            description={product.description}

            price={
              product.discountPrice ||
              product.price
            }

            mrp={product.price}

            stock={product.stock}

            maxOrderStock={
              product.maxOrderStock
            }

            // ✅ only user api has this
            cartQuantity={
              product.cartQuantity || 0
            }

            image={
              product.imageThumbnail ||
              product.imageUrls?.[0]
            }

            onProductClick={
              handleProductClick
            }
          />
        ))}

      </div>
    </div>
  );
};

export default Products;