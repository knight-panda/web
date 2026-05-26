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

  const {
    uploadImages,
    loading: uploadLoading
  } = useUploadProductImages();

  const { createStoreProduct } = useAddStoreProduct();
  const { editStoreProduct } = useUpdateStoreProduct();
  const { removeStoreProduct, loading: deleteLoading } = useDeleteStoreProduct();

  // ================= IMAGES =================

  const [image, setImage] = useState<string>("");
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ================= TAGS =================

  const [tagInput, setTagInput] = useState("");

  // ================= VARIANTS =================

  const [variants, setVariants] = useState([
    {
      variantName: "",
      size: "",
      color: "",
      unitValue: 0,
      unitType: "",
      sku: "",
      price: 0,
      discountPrice: 0,
      quantity: 0,
      maxOrderQuantity: 1,
    },
  ]);

  // ================= FORM =================

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    categoryId: "",
    tags: [] as string[],
  });

  useEffect(() => {

    if (product) {

      setForm({
        name: product.name || "",
        description:
          product.description || "",
        category:
          product.category || "",
        categoryId:
          product.categoryId || "",
        tags:
          product.tags || [],
      });

      setImage(
        product.imageThumbnail || ""
      );

      setExistingImages(
        product.imageUrls || []
      );

      setExtraImages(
        product.imageUrls || []
      );

      if (
        product.variants &&
        product.variants.length > 0
      ) {

        setVariants(
          product.variants.map(
            (variant: any) => ({
              variantName:
                variant.variantName || "",

              size:
                variant.size || "",

              color:
                variant.color || "",

              unitValue:
                variant.unitValue || 0,

              unitType:
                variant.unitType || "",

              sku:
                variant.sku || "",

              price:
                variant.price || 0,

              discountPrice:
                variant.discountPrice || 0,

              quantity:
                variant.quantity || 0,

              maxOrderQuantity:
                variant.maxOrderQuantity || 1,
            })
          )
        );
      }
    }
  }, [product]);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const multiFileInputRef =
    useRef<HTMLInputElement>(null);

  const createdAt =
    new Date()
      .toISOString()
      .split("T")[0];

  // ================= IMAGE =================

  const handleReplaceClick = () =>
    fileInputRef.current?.click();

  const MAX_SIZE =
    7 * 1024 * 1024;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_SIZE) {

      alert(
        "Image must be less than 7MB"
      );

      return;
    }

    setThumbnailFile(file);

    setImage(
      URL.createObjectURL(file)
    );
  };

  const handleRemove = () => {

    setImage("");

    setThumbnailFile(null);
  };

  const handleAddMoreClick = () =>
    multiFileInputRef.current?.click();

  const handleMultiFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const files = Array.from(
      e.target.files || []
    );

    const validFiles =
      files.filter((file) => {

        if (file.size > MAX_SIZE) {

          alert(
            `${file.name} is larger than 7MB`
          );

          return false;
        }

        return true;
      });

    setExtraFiles((prev) => [
      ...prev,
      ...validFiles,
    ]);

    const urls =
      validFiles.map((file) =>
        URL.createObjectURL(file)
      );

    setExtraImages((prev) => [
      ...prev,
      ...urls,
    ]);
  };

  const handleRemoveExtra = (
    index: number
  ) => {

    setExtraImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    if (index < existingImages.length) {

      setExistingImages((prev) =>
        prev.filter((_, i) => i !== index)
      );

    } else {

      const newIndex =
        index - existingImages.length;

      setExtraFiles((prev) =>
        prev.filter((_, i) => i !== newIndex)
      );
    }
  };

  // ================= INPUT =================

  const handleChange = (
    key: string,
    value: any
  ) => {

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= TAGS =================

  const addTag = () => {

    if (!tagInput.trim()) return;

    if (
      form.tags.includes(
        tagInput.trim()
      )
    ) {

      return;
    }

    setForm((prev) => ({
      ...prev,
      tags: [
        ...prev.tags,
        tagInput.trim(),
      ],
    }));

    setTagInput("");
  };

  const removeTag = (
    tag: string
  ) => {

    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (t) => t !== tag
      ),
    }));
  };

  // ================= VARIANTS =================

  const handleVariantChange = (
    index: number,
    key: string,
    value: any
  ) => {

    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? {
            ...variant,
            [key]: value,
          }
          : variant
      )
    );
  };

  const addVariant = () => {

    setVariants((prev) => [
      ...prev,
      {
        variantName: "",
        size: "",
        color: "",
        unitValue: 0,
        unitType: "",
        sku: "",
        price: 0,
        discountPrice: 0,
        quantity: 0,
        maxOrderQuantity: 1,
      },
    ]);
  };

  const removeVariant = (
    index: number
  ) => {

    setVariants((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    try {

      let thumbnailUrl = image;

      if (thumbnailFile) {

        const res =
          await uploadImages([
            thumbnailFile,
          ]);

        thumbnailUrl = res[0];
      }

      let finalImageUrls = [
        ...existingImages,
      ];

      if (extraFiles.length > 0) {

        const uploaded =
          await uploadImages(extraFiles);

        finalImageUrls = [
          ...existingImages,
          ...uploaded,
        ];
      }

      const payload = {

        name: form.name,

        description:
          form.description,

        category:
          form.category,

        categoryId:
          form.categoryId,

        imageThumbnail:
          thumbnailUrl,

        imageUrls:
          finalImageUrls,

        tags:
          form.tags,

        variants: variants.map((variant) => ({
          variantName: variant.variantName,

          size:
            variant.size || undefined,

          color:
            variant.color || undefined,

          unitValue:
            Number(variant.unitValue) ||
            undefined,

          unitType:
            variant.unitType || undefined,

          sku: variant.sku,

          price:
            Number(variant.price),

          discountPrice:
            Number(variant.discountPrice),

          quantity:
            Number(variant.quantity),

          maxOrderQuantity:
            Number(
              variant.maxOrderQuantity
            ),
        })),
      };

      if (!isAdd && productId) {

        await editStoreProduct(
          productId,
          payload
        );

      } else {

        await createStoreProduct(
          payload
        );
      }

      navigate(-1);

    } catch (err) {

      console.error(err);
    }
  };

  const handleDelete = async () => {

    if (!product.id) return;

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await removeStoreProduct(
        product.id
      );

      alert(
        "Product deleted successfully"
      );

      navigate(-1);

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
            className="au-product-btn product-add"
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

          <div className="au-product-header-text">
            Product Image
          </div>

          <div className="au-product-image-box">

            {image ? (

              <img
                className="au-product-image"
                src={image}
                alt="product"
              />

            ) : (

              <div className="au-product-placeholder">
                No Image Selected
              </div>
            )}

            <div className="au-product-img-actions">

              {!image ? (

                <button
                  className="au-product-btn small primary"
                  onClick={handleReplaceClick}
                >
                  Upload Image
                </button>

              ) : (

                <>
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
                </>
              )}
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

              <div
                key={index}
                className="au-product-image-item"
              >

                <img src={img} alt="extra" />

                <button
                  className="au-product-btn small danger remove-btn"
                  onClick={() =>
                    handleRemoveExtra(index)
                  }
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

          {/* GENERAL */}
          <div className="au-product-card">

            <div className="au-product-header-text">
              General Information
            </div>

            <div className="au-product-form-group">

              <label>Product Name</label>

              <input
                value={form.name}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="au-product-form-group">

              <label>Category</label>

              <input
                value={form.category}
                onChange={(e) =>
                  handleChange(
                    "category",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="au-product-form-group">

              <label>Description</label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="au-product-form-group">

              <label>Created Date</label>

              <input
                type="date"
                value={createdAt}
                disabled
              />
            </div>
          </div>

          {/* TAGS */}
          <div className="au-product-card">

            <div className="au-product-header-text">
              Product Tags
            </div>

            <div className="au-product-row">

              <input
                value={tagInput}
                placeholder="Enter tag"
                onChange={(e) =>
                  setTagInput(
                    e.target.value
                  )
                }
              />

              <button
                className="au-product-btn tag-add"
                onClick={addTag}
              >
                Add Tag
              </button>
            </div>

            <div className="au-product-tags">

              {form.tags.map((tag) => (

                <div
                  key={tag}
                  className="au-product-tag"
                >

                  <span>{tag}</span>

                  <button
                    onClick={() =>
                      removeTag(tag)
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* VARIANTS */}
          <div className="au-product-card">

            <div className="au-product-header-text">
              Product Variants
            </div>

            {variants.map((variant, index) => (

              <div
                key={index}
                className="au-product-variant-box"
              >

                <div className="au-product-row">

                  <div className="au-product-form-group">
                    <label>Variant Name</label>

                    <input
                      placeholder="Example: 1kg / XL / Black Large"
                      value={
                        variant.variantName
                      }
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "variantName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="au-product-form-group">
                    <label>SKU</label>

                    <input
                      placeholder="Example: RICE-1KG"
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "sku",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="au-product-row">

                  <div className="au-product-form-group">
                    <label>Price</label>

                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="au-product-form-group">
                    <label>
                      Discount Price
                    </label>

                    <input
                      type="number"
                      value={
                        variant.discountPrice
                      }
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "discountPrice",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="au-product-row">

                  <div className="au-product-form-group">
                    <label>Quantity</label>

                    <input
                      type="number"
                      value={
                        variant.quantity
                      }
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="au-product-form-group">
                    <label>
                      Max Order Quantity
                    </label>

                    <input
                      type="number"
                      value={
                        variant.maxOrderQuantity
                      }
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "maxOrderQuantity",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <button
                  className="au-product-btn variant-remove"
                  onClick={() =>
                    removeVariant(index)
                  }
                >
                  Remove Variant
                </button>
              </div>
            ))}

            <button
              className="au-product-btn variant-add"
              onClick={addVariant}
            >
              + Add Variant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateProduct;