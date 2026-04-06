import React, { useRef, useState } from "react";
import "./AddUpdateProduct.css";
import { MdOutlineArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddStoreProduct, useUpdateStoreProduct } from "../../../hooks/store/useStoreProduct";

const AddUpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdd = location.pathname === "/add";
  const productId = location.pathname.split("/").pop();

  const { createStoreProduct } = useAddStoreProduct();
  const { editStoreProduct } = useUpdateStoreProduct();

  const [image, setImage] = useState<string>(
    "https://m.media-amazon.com/images/I/71ZjEl7y78L._SX679_.jpg"
  );
  const [extraImages, setExtraImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    minimumStock: 0,
    tags: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const createdAt = new Date().toISOString().split("T")[0];

  // ================= IMAGE HANDLING =================
  const handleReplaceClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => setImage("");

  const handleAddMoreClick = () => multiFileInputRef.current?.click();

  const handleMultiFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setExtraImages((prev) => [...prev, ...urls]);
  };

  const handleRemoveExtra = (index: number) => {
    setExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= INPUT HANDLING =================
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ================= API CALL =================
  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice),
      stock: Number(form.stock),
      minimumStock: Number(form.minimumStock),
      imageThumbnail: image,
      imageUrls: extraImages,
      tags: form.tags,
    };

    try {
      if (isAdd && productId) {
        await editStoreProduct(productId, payload);
      } else {
        await createStoreProduct(payload);
      }

      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="au-product-page">
      {/* Header */}
      <div className="au-product-topbar">
        <div className="au-product-back" onClick={() => navigate(-1)}>
          <MdOutlineArrowBack />
          <div>{isAdd ? "Update Product" : "Add New Product"}</div>
        </div>

        <div className="au-product-actions">
          <button className="au-product-btn primary" onClick={handleSubmit}>
            {isAdd ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      <div className="au-product-grid">
        {/* LEFT */}
        <div className="au-product-card">
          <div className="au-product-header-text">Product Image</div>

          <div className="au-product-image-box">
            {image && <img src={image} alt="product" />}

            <div className="au-product-img-actions">
              <button className="au-product-btn small" onClick={handleReplaceClick}>
                Replace
              </button>

              <button className="au-product-btn small danger" onClick={handleRemove}>
                Remove
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <button className="au-product-btn light full" onClick={handleAddMoreClick}>
            + Add Another Image
          </button>

          <div className="au-product-image-grid">
            {extraImages.map((img, index) => (
              <div key={index} className="au-product-image-item">
                <img src={img} alt="extra" />
                <button
                  className="au-product-btn small danger remove-btn"
                  onClick={() => handleRemoveExtra(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleMultiFilesChange}
          />
        </div>

        {/* RIGHT */}
        <div className="au-product-au-product-right-column">
          <div className="au-product-card">
            <div className="au-product-header-text">General Information</div>

            <div className="au-product-form-group">
              <label>Product Name</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="au-product-row">
              <div className="au-product-form-group">
                <label>Price</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              <div className="au-product-form-group">
                <label>Discount Price</label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleChange("discountPrice", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="au-product-form-group">
              <label>Description</label>
              <textarea
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
              />
            </div>

            {/* ✅ Created Date (disabled) */}
            <div className="au-product-form-group">
              <label>Created Date</label>
              <input type="date" value={createdAt} disabled />
            </div>
          </div>

          {/* STOCK */}
          <div className="au-product-card">
            <div className="au-product-header-text">Manage Stock</div>

            <div className="au-product-row">
              <div className="au-product-form-group">
                <label>Stock</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("stock", e.target.value)}
                />
              </div>

              <div className="au-product-form-group">
                <label>Minimum Stock</label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleChange("minimumStock", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateProduct;