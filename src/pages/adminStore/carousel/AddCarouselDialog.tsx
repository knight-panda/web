import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const AddCarouselDialog: React.FC<Props> = ({ onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImage = (file: File | null) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    // 👉 call API here
    console.log("Uploading:", file);

    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Upload Banner</h2>

        {/* Upload Area */}
        <div className="upload-box">
          {!preview ? (
            <label className="upload-placeholder">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files?.[0] || null)}
                hidden
              />
              <div>Click to upload image</div>
            </label>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="preview" className="preview" />

              <button
                className="change-btn"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
              >
                Change Image
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="dialog-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSave}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarouselDialog;