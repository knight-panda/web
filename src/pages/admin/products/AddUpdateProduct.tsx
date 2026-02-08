import React from 'react'
import "./AddUpdateProduct.css"

import { MdOutlineArrowBack } from "react-icons/md";

const AddUpdateProduct = () => {
  return (
    <div className="au-product-page">
      {/* Header */}
      <div className="au-product-topbar">
        <div className="au-product-back">
          <MdOutlineArrowBack />
          <div>Add New Product</div>
        </div>

        <div className="au-product-actions">
          <button className="au-product-btn primary">Add Product</button>
        </div>
      </div>

      <div className="grid">
        {/* LEFT SIDE */}
        <div className="card">
          <div>Product Image</div>

          <label>Tag</label>
          <div className="tags">
            <span className="tag">Sunscreen ✕</span>
            <span className="tag">Sun ✕</span>
          </div>

          <label>Product Image</label>

          <div className="image-box">
            <img
              src="https://via.placeholder.com/200x240"
              alt="product"
            />

            <div className="img-actions">
              <button className="btn small">Replace</button>
              <button className="btn small danger">Remove</button>
            </div>
          </div>

          <button className="btn light full">+ Add Another Image</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-column">
          {/* General Info */}
          <div className="card">
            <div>General Information</div>

            <div className="form-group">
              <label>Product Name</label>
              <input placeholder="Enter product name" />
            </div>

            <div className="row">
              <div className="form-group">
                <label>Product Type</label>
                <select>
                  <option>Moisturizer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Product Merk</label>
                <input defaultValue="Scarlett Whitening" />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Price</label>
                <input defaultValue="$ 100.00" />
              </div>

              <div className="form-group">
                <label>Discount</label>
                <input defaultValue="20%" />
              </div>

              <div className="form-group">
                <label>Discount Price</label>
                <input defaultValue="$ 80.00" />
              </div>
            </div>

            <div className="form-group">
              <label>Business Descriptions</label>
              <textarea placeholder="Description" />
            </div>

            <div className="form-group">
              <label>Expiration Date</label>
              <input type="date" />
            </div>
          </div>

          {/* Manage Stock */}
          <div className="card">
            <div>Manage Stock</div>

            <div className="row">
              <div className="form-group">
                <label>Stock Keeping Unit</label>
                <input defaultValue="SKC001380003" />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input defaultValue="2000" />
              </div>

              <div className="form-group">
                <label>Minimum Stock</label>
                <input defaultValue="10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateProduct