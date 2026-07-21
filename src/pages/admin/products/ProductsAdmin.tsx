import ProductCardAdmin from "../../../components/Product/ProductCardAdmin";
import { useEffect, useState } from "react";
import "./ProductsAdmin.css";

import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetStoreProducts } from "../../../hooks/store/useStoreProduct";

const ProductsAdmin = () => {

  const navigate = useNavigate();

  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const {
    fetchStoreProducts,
    data,
    loading,
    error
  } = useGetStoreProducts();

  const filterOptions = [
    { value: "all", label: "All Products" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {

    fetchStoreProducts();

  }, []);

  useEffect(() => {

    const close = () => setFilterOpen(false);

    window.addEventListener("click", close);

    return () =>
      window.removeEventListener("click", close);

  }, []);

  return (
    <div className="admin-product">

      <div className="admin-product-title-box">

        <div className="admin-product-title">
          Products
        </div>

        <div
          className="admin-add-product"
          onClick={() => navigate("add")}
        >
          Add Product +
        </div>

        <div
          className="admin-product-filter-container"
          onClick={(e) => e.stopPropagation()}
        >

          <span>Filter</span>

          <IoFilter
            className="admin-product-filter"
            onClick={() =>
              setFilterOpen(!filterOpen)
            }
          />

          {filterOpen && (

            <div className="admin-product-filter-dropdown">

              <select
                className="admin-product-filter-select"
                value={selectedFilter}
                onChange={(e) => {

                  setSelectedFilter(
                    e.target.value
                  );

                  setFilterOpen(false);
                }}
              >

                {filterOptions.map((option) => (

                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>

                ))}

              </select>

            </div>
          )}
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div>
          Loading products...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{ color: "red" }}>
          {error}
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="admin-products-grid">

        {data?.data?.map((product) => {

          return (

            <div
              key={product.id}
              onClick={() =>
                navigate(
                  `/admin-dashboard/products/${product.id}`,
                  {
                    state: { product }
                  }
                )
              }
            >

              <ProductCardAdmin
                title={product.name}

                description={product.description}

                image={product.imageThumbnail}

                variants={product.variants || []}
              />

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsAdmin;