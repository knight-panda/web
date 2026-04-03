import React, { useState, useRef } from "react";
import { useAddStoreCarousel, useUpdateStoreCarousel } from "../../../hooks/store/useStoreCarousel";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  editMode?: boolean;
  initialData?: {
    id: string;
    imageUrl: string;
  };
}

const AddCarouselDialog: React.FC<Props> = ({
  onClose,
  onSuccess,
  editMode = false,
  initialData
}) => {
  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { updateProfile } = useUpdateAdminProfile();
  const { createStoreCarousel, loading: createLoading } = useAddStoreCarousel();
  const { editStoreCarousel, loading: updateLoading } = useUpdateStoreCarousel();

  const [uploading, setUploading] = useState(false);

  const isLoading = uploading || createLoading || updateLoading;

  const handleImage = (file: File | null) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e?.preventDefault();

    try {
      setUploading(true);

      let imageUrl = initialData?.imageUrl;

      // ✅ If user selected new image → upload
      if (file) {
        const uploadedUrl = await updateProfile(file);

        if (!uploadedUrl) {
          throw new Error("Image upload failed");
        }

        imageUrl = uploadedUrl;
      }

      if (!imageUrl) {
        alert("Please upload an image");
        return;
      }

      const payload = { imageUrl };

      let res;

      // ✅ EDIT MODE
      if (editMode && initialData?.id) {
        res = await editStoreCarousel(initialData.id, payload);
      }
      // ✅ CREATE MODE
      else {
        res = await createStoreCarousel(payload);
      }

      if (res?.success) {
        onSuccess();
        onClose();
      } else {
        alert("Operation failed");
      }

    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Upload Banner</h2>

        {/* Upload Area */}
        <div className="upload-box">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleImage(file);
              e.target.value = ""; // allow same file reselect
            }}
          />

          {!preview ? (
            <label
              className="upload-placeholder"
              onClick={() => fileInputRef.current?.click()}
            >
              <div>Click to upload image</div>
            </label>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="preview" className="preview" />

              <button
                type="button"
                className="change-btn"
                onClick={() => fileInputRef.current?.click()} // ✅ open picker
              >
                Change Image
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="dialog-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading
              ? editMode
                ? "Updating..."
                : "Uploading..."
              : editMode
                ? "Update"
                : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarouselDialog;