import React, { useRef, useState, useEffect } from "react";
import "./AddUpdateProduct.css";
import { MdOutlineArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddStoreProduct,
  useDeleteStoreProduct,
  useUpdateStoreProduct,
  useUploadProductImages,
} from "../../../hooks/store/useStoreProduct";

const AddUpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const isAdd = location.pathname.endsWith("/add");
  const productId = location.pathname.split("/").pop();

  const { uploadImages, loading: uploadLoading } = useUploadProductImages();
  const { createStoreProduct } = useAddStoreProduct();
  const { editStoreProduct } = useUpdateStoreProduct();
  const { removeStoreProduct, loading: deleteLoading } = useDeleteStoreProduct();

  // ✅ Preview states
  const [image, setImage] = useState<string>("");
  const [extraImages, setExtraImages] = useState<string[]>([]);

  // ✅ File states (IMPORTANT)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        discountPrice: product.discountPrice || 0,
        stock: product.stock || 0,
        minimumStock: product.minimumStock || 0,
        tags: product.tags || [],
      });

      setImage(product.imageThumbnail || "");

      // ✅ store existing images separately
      setExistingImages(product.imageUrls || []);
      setExtraImages(product.imageUrls || []);
    }
  }, [product]);

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
      setThumbnailFile(file); // ✅ store file
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  const handleRemove = () => {
    setImage("");
    setThumbnailFile(null);
  };

  const handleAddMoreClick = () => multiFileInputRef.current?.click();

  const handleMultiFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setExtraFiles((prev) => [...prev, ...files]); // ✅ store files

    const urls = files.map((file) => URL.createObjectURL(file));
    setExtraImages((prev) => [...prev, ...urls]); // preview
  };

  const handleRemoveExtra = (index: number) => {
    // remove from preview
    setExtraImages((prev) => prev.filter((_, i) => i !== index));

    // remove from existing images
    setExistingImages((prev) => prev.filter((_, i) => i !== index));

    // remove from new files
    setExtraFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= INPUT HANDLING =================

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ================= API CALL =================

  const handleSubmit = async () => {
    try {
      let thumbnailUrl = image;

      // ✅ Upload thumbnail
      if (thumbnailFile) {
        const res = await uploadImages([thumbnailFile]);
        thumbnailUrl = res[0];
      }

      // ✅ Start with existing images
      let finalImageUrls = [...existingImages];

      // ✅ Upload new images and merge
      if (extraFiles.length > 0) {
        const uploaded = await uploadImages(extraFiles);
        finalImageUrls = [...existingImages, ...uploaded];
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        discountPrice: Number(form.discountPrice),
        stock: Number(form.stock),
        minimumStock: Number(form.minimumStock),
        imageThumbnail: thumbnailUrl,
        imageUrls: finalImageUrls, // ✅ FIXED (merged)
        tags: form.tags,
      };

      if (!isAdd && productId) {
        await editStoreProduct(productId, payload);
      } else {
        await createStoreProduct(payload);
      }

      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!product.id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await removeStoreProduct(product.id);

      alert("Product deleted successfully");

      navigate(-1); // go back

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="au-product-page">
      {/* Header */}
      <div className="au-product-topbar">
        <div className="au-product-back" onClick={() => navigate(-1)}>
          <MdOutlineArrowBack />
          <div>{isAdd ? "Add Product" : "Update Product"}</div>
        </div>

        <div className="au-product-actions">
          {!isAdd && (
            <button
              className="au-product-btn danger"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete Product"}
            </button>
          )}
          <button
            className="au-product-btn primary"
            onClick={handleSubmit}
            disabled={uploadLoading}
          >
            {uploadLoading
              ? "Uploading..."
              : isAdd
                ? "Add Product"
                : "Update Product"}
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
              <button
                className="au-product-btn small"
                onClick={handleReplaceClick}
              >
                Replace
              </button>

              <button
                className="au-product-btn small danger"
                onClick={handleRemove}
              >
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

          <button
            className="au-product-btn light full"
            onClick={handleAddMoreClick}
          >
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
            <div className="au-product-header-text">
              General Information
            </div>

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
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              <div className="au-product-form-group">
                <label>Discount Price</label>
                <input
                  type="number"
                  value={form.discountPrice}
                  onChange={(e) => handleChange("discountPrice", e.target.value)}
                />
              </div>
            </div>

            <div className="au-product-form-group">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

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
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                />
              </div>

              <div className="au-product-form-group">
                <label>Minimum Stock</label>
                <input
                  type="number"
                  value={form.minimumStock}
                  onChange={(e) => handleChange("minimumStock", e.target.value)}
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