import React, { useRef, useState } from "react";
import "./AddUpdateProduct.css"

import { MdOutlineArrowBack } from "react-icons/md";

const AddUpdateProduct = () => {
  const [image, setImage] = useState<string>(
    "https://m.media-amazon.com/images/I/71ZjEl7y78L._SX679_.jpg"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceClick = () => {
    fileInputRef.current?.click(); // open file picker
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };

  const handleRemove = () => {
    setImage(""); // remove image
  };

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

      <div className="au-product-grid">
        {/* LEFT SIDE */}
        <div className="au-product-card">
          <div className="au-product-header-text">Product Image</div>

          <div className="au-product-tags-title">Tags</div>
          <div className="au-product-tags">
            <span className="au-product-tag">Sunscreen ✕</span>
            <span className="au-product-tag">Sun ✕</span>
          </div>

          <div className="au-product-image-box">
            {image && <img src={image} alt="product" />}

            <div className="au-product-img-actions">
              <button className="au-product-btn small" onClick={handleReplaceClick}>
                Replace
              </button>

              <button
                className="au-product-btn small danger"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>

            {/* hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <button className="au-product-btn light full">+ Add Another Image</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="au-product-au-product-right-column">
          {/* General Info */}
          <div className="au-product-card">
            <div className="au-product-header-text">General Information</div>

            <div className="au-product-form-group">
              <label>Product Name</label>
              <input placeholder="Enter product name" />
            </div>

            <div className="au-product-row">
              <div className="au-product-form-group">
                <label>Product Type</label>
                <select>
                  <option>Moisturizer</option>
                </select>
              </div>

              <div className="au-product-form-group">
                <label>Product Merk</label>
                <input defaultValue="Scarlett Whitening" />
              </div>
            </div>

            <div className="au-product-row">
              <div className="au-product-form-group">
                <label>Price</label>
                <input defaultValue="$ 100.00" />
              </div>

              <div className="au-product-form-group">
                <label>Discount</label>
                <input defaultValue="20%" />
              </div>

              <div className="au-product-form-group">
                <label>Discount Price</label>
                <input defaultValue="$ 80.00" />
              </div>
            </div>

            <div className="au-product-form-group">
              <label>Business Descriptions</label>
              <textarea placeholder="Description" />
            </div>

            <div className="au-product-form-group">
              <label>Expiration Date</label>
              <input type="date" />
            </div>
          </div>

          {/* Manage Stock */}
          <div className="au-product-card">
            <div className="au-product-header-text">Manage Stock</div>

            <div className="au-product-row">
              <div className="au-product-form-group">
                <label>Stock Keeping Unit</label>
                <input defaultValue="SKC001380003" />
              </div>

              <div className="au-product-form-group">
                <label>Stock</label>
                <input defaultValue="2000" />
              </div>

              <div className="au-product-form-group">
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