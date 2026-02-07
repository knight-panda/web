import ProductCardAdmin from "../../../components/Product/ProductCardAdmin"
import { useEffect, useState } from "react";
import type { Product } from "../../../models/Product"
import "./ProductsAdmin.css"

import { IoFilter } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const products: Product[] = [
  {
    id: 1,
    title: "Campus Running Shoes",
    price: 1299,
    mrp: 2499,
    stock: 10,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/6/9/9/8-brd-406-campus-original-imagk9f7k9gzfmyb.jpeg"
  },
  {
    id: 2,
    title: "Noise Smart Watch",
    price: 1999,
    mrp: 3999,
    stock: 8,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/l/z/n/-original-imagp6kx9z3zdhmy.jpeg"
  },
  {
    id: 3,
    title: "Boat Wireless Headphones",
    price: 1499,
    mrp: 2999,
    stock: 15,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/j/d/2/-original-imaghhrysf6pzszp.jpeg"
  },
  {
    id: 4,
    title: "Puma Casual T-Shirt",
    price: 799,
    mrp: 1599,
    stock: 20,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/t-shirt/y/o/q/m-original-imagkzcgxhhkzm8g.jpeg"
  },
  {
    id: 3,
    title: "Boat Wireless Headphones",
    price: 1499,
    mrp: 2999,
    stock: 15,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/j/d/2/-original-imaghhrysf6pzszp.jpeg"
  },
  {
    id: 4,
    title: "Puma Casual T-Shirt",
    price: 799,
    mrp: 1599,
    stock: 20,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/t-shirt/y/o/q/m-original-imagkzcgxhhkzm8g.jpeg"
  }
]

const ProductsAdmin = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    const close = () => setFilterOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="admin-product">
      <div className="admin-product-title-box">
        <div className="admin-product-title">Products</div>

        <div className="admin-add-product">
          Add Product +
        </div>
        {/* <IoFilter className="orders-filter"/> */}

        <div className="admin-product-filter-container" onClick={(e) => e.stopPropagation()}>
          <span>Filter</span>
          <IoFilter
            className="admin-product-filter"
            onClick={() => setFilterOpen(!filterOpen)}
          />

          {filterOpen && (
            <div className="admin-product-filter-dropdown">
              <select
                className="admin-product-filter-select"
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setFilterOpen(false);
                }}
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>


      </div>
      <div className="admin-products-grid">
        {products.map((item) => (
          <div onClick={() => navigate(`/admin-dashboard/products/${"58"}`)}>
            <ProductCardAdmin />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsAdmin
