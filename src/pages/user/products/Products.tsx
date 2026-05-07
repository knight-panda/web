import { useEffect } from "react";
import ProductCard from "../../../components/Product/ProductCard";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { usePublicProducts } from "../../../hooks/user/usePublicStore";
import type { Product } from "../../../models/user/public/response/PublicProductsResponse";

type Props = {
  storeId: string;
};

const Products = ({ storeId }: Props) => {
  const navigate = useNavigate();
  const { fetchProducts, data, loading, error } = usePublicProducts();

  // ✅ Fetch products
  useEffect(() => {
    if (storeId) {
      fetchProducts(storeId);
    }
  }, [storeId]);

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  // ⏳ Loading UI
  if (loading) {
    return <div className="product">Loading products...</div>;
  }

  // ❌ Error UI
  if (error) {
    return <div className="product">Error: {error}</div>;
  }

  // ⚠️ No products
  if (!data?.data?.length) {
    return <div className="product">No products available</div>;
  }

  return (
    <div className="product">
      <div className="products-grid">
        {data.data.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name} // ✅ name → title
            price={product.discountPrice || product.price} // ✅ use discount if available
            mrp={product.price} // ✅ original price
            stock={product.stock}
            maxOrderQuantity={product.maxOrderQuantity}
            image={product.imageThumbnail || product.imageUrls?.[0]} // ✅ thumbnail or first image
            onProductClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
