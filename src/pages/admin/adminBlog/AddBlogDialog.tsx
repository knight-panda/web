import { useState } from "react";
import "./AddBlogDialog.css";

export interface BlogModel {
    blogId: string;
    tagline: string;
    title: string;
    description: string;
    imageUrl: string;
}

interface AddBlogDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (blog: BlogModel) => void;
}

const AddBlogDialog = ({
    isOpen,
    onClose,
    onSave
}: AddBlogDialogProps) => {
    const [tagline, setTagline] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleImageSelect = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);
        setImageUrl(preview);
    };

    const handleSave = () => {
        if (
            !tagline.trim() ||
            !title.trim() ||
            !description.trim() ||
            !imageUrl
        ) {
            alert("Please fill all fields");
            return;
        }

        onSave({
            blogId: crypto.randomUUID(),
            tagline,
            title,
            description,
            imageUrl
        });

        setTagline("");
        setTitle("");
        setDescription("");
        setImageUrl("");

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="blog-dialog-overlay">
            <div className="blog-dialog">
                <div className="blog-dialog-header">
                    <h2>Add Blog</h2>

                    <button
                        className="blog-close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="blog-dialog-content">
                    <div className="blog-form-group">
                        <label>Tagline</label>

                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) =>
                                setTagline(e.target.value)
                            }
                            placeholder="Enter tagline"
                        />
                    </div>

                    <div className="blog-form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter title"
                        />
                    </div>

                    <div className="blog-form-group">
                        <label>Description</label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter description"
                        />
                    </div>

                    <div className="blog-form-group">
                        <label>Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                    </div>

                    {imageUrl && (
                        <div className="blog-preview">
                            <img
                                src={imageUrl}
                                alt="preview"
                            />
                        </div>
                    )}
                </div>

                <div className="blog-dialog-footer">
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        Save Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlogDialog;