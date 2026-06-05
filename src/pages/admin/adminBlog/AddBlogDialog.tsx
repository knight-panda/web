import { useState, useEffect } from "react";
import "./AddBlogDialog.css";
import { useUpdateAdminProfile } from "../../../hooks/admin/auth/useAdminRegister";
import { useCreateStoreBlog } from "../../../hooks/admin/adminStoreBlogs/useCreateStoreBlog";
import type { AdminStoreBlogsRequest } from "../../../models/admin/storeBlogs/request/AdminStoreBlogsRequest";
import { useUpdateStoreBlog } from "../../../hooks/admin/adminStoreBlogs/useUpdateStoreBlog";
import type { StoreBlogsData } from "../../../models/admin/storeBlogs/response/StoreBlogsData";

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
    onSave: () => void;

    editMode?: boolean;

    initialData?: StoreBlogsData | null;
}

const AddBlogDialog = ({
    isOpen,
    onClose,
    onSave,
    editMode = false,
    initialData
}: AddBlogDialogProps) => {
    const [tagline, setTagline] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const { updateProfile } =
        useUpdateAdminProfile();

    const { createBlog, loading } =
        useCreateStoreBlog();

    const { updateBlog } =
        useUpdateStoreBlog();

    const [file, setFile] =
        useState<File | null>(null);

    const [uploading, setUploading] =
        useState(false);

    useEffect(() => {

        if (!isOpen) return;

        setTagline(
            initialData?.tagline ?? ""
        );

        setTitle(
            initialData?.title ?? ""
        );

        setDescription(
            initialData?.description ?? ""
        );

        setImageUrl(
            initialData?.imageUrl ?? ""
        );

        setFile(null);

    }, [isOpen, initialData]);

    const handleImageSelect = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const selectedFile =
            e.target.files?.[0];

        if (!selectedFile) return;

        if (
            !selectedFile.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please upload a valid image"
            );

            return;
        }

        const maxSize =
            7 * 1024 * 1024;

        if (
            selectedFile.size > maxSize
        ) {

            alert(
                "Image size must be less than 7MB"
            );

            return;
        }

        setFile(selectedFile);

        setImageUrl(
            URL.createObjectURL(
                selectedFile
            )
        );
    };

    const handleSave = async () => {

        if (
            !tagline.trim() ||
            !title.trim() ||
            !description.trim()
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        if (
            !file &&
            !initialData?.imageUrl
        ) {

            alert(
                "Please select an image"
            );

            return;
        }

        try {

            setUploading(true);

            let uploadedImageUrl =
                initialData?.imageUrl ?? "";

            if (file) {

                const uploaded =
                    await updateProfile(file);

                if (!uploaded) {

                    alert(
                        "Image upload failed"
                    );

                    return;
                }

                uploadedImageUrl =
                    uploaded;
            }

            const request:
                AdminStoreBlogsRequest = {

                tagline,
                title,
                description,
                imageUrl:
                    uploadedImageUrl
            };

            const response =
                editMode &&
                    initialData?.blogId

                    ? await updateBlog(
                        initialData.blogId,
                        request
                    )

                    : await createBlog(
                        request
                    );

            if (response.success) {

                onSave();
                setTagline("");
                setTitle("");
                setDescription("");
                setImageUrl("");
                setFile(null);

                onClose();

            } else {

                alert(
                    response.message
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "Failed to create blog"
            );

        } finally {

            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="blog-dialog-overlay">
            <div className="blog-dialog">
                <div className="blog-dialog-header">
                    <h2>
                        {
                            editMode
                                ? "Edit Blog"
                                : "Add Blog"
                        }
                    </h2>

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
                        disabled={
                            loading || uploading
                        }
                    >
                        {
                            loading || uploading
                                ? (
                                    editMode
                                        ? "Updating..."
                                        : "Saving..."
                                )
                                : (
                                    editMode
                                        ? "Update Blog"
                                        : "Save Blog"
                                )
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlogDialog;