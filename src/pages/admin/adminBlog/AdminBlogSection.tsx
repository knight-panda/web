import { useEffect, useState } from "react";
import "./AdminBlogSection.css";
import AddBlogDialog from "./AddBlogDialog";
import { useStoreBlogs } from "../../../hooks/admin/adminStoreBlogs/useStoreBlogs";
import { useDeleteStoreBlog } from "../../../hooks/admin/adminStoreBlogs/useDeleteStoreBlog";
import type { StoreBlogsData } from "../../../models/admin/storeBlogs/response/StoreBlogsData";

const AdminBlogSection = () => {

    const [showDialog, setShowDialog] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<StoreBlogsData | null>(null);

    const {
        loading,
        error,
        blogs,
        fetchBlogs
    } = useStoreBlogs();
    const {
        removeBlog,
        loading: deleting
    } = useDeleteStoreBlog();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (
        blogId: string
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this blog?"
            );

        if (!confirmed) return;

        const success =
            await removeBlog(blogId);

        if (success) {

            fetchBlogs();
        }
    };

    return (
        <div className="admin-blogs-container">

            <AddBlogDialog
                isOpen={showDialog}
                editMode={selectedBlog !== null}
                initialData={selectedBlog}
                onClose={() => {

                    setShowDialog(false);

                    setSelectedBlog(null);
                }}
                onSave={() => {

                    setShowDialog(false);

                    setSelectedBlog(null);

                    fetchBlogs();
                }}
            />

            <div className="admin-blogs-title-box">

                <div className="admin-blogs-title">
                    Blogs
                </div>

                <div
                    className="admin-add-blogs"
                    onClick={() => setShowDialog(true)}
                >
                    Add Blog +
                </div>

            </div>

            {loading && (
                <div className="admin-blogs-loading">
                    Loading blogs...
                </div>
            )}

            {error && (
                <div className="admin-blogs-error">
                    {error}
                </div>
            )}

            {!loading &&
                blogs.length === 0 && (
                    <div className="admin-blogs-empty">
                        No blogs found
                    </div>
                )}

            {blogs.map((blog, index) => {

                const reverse =
                    index % 2 !== 0;

                return (
                    <section
                        key={blog.blogId}
                        className={`admin-blog-section ${reverse
                            ? "admin-blog-section-reverse"
                            : ""
                            }`}
                    >

                        <div className="admin-blog-actions">

                            <button
                                className="admin-blog-edit-btn"
                                onClick={() => {

                                    setSelectedBlog(blog);
                                    setShowDialog(true);
                                }}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                className="admin-blog-delete-btn"
                                disabled={deleting}
                                onClick={() =>
                                    handleDelete(blog.blogId)
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "🗑 Delete"}
                            </button>

                        </div>

                        <div className="admin-blog-content">

                            <span className="admin-blog-tagline">
                                {blog.tagline}
                            </span>

                            <h2 className="admin-blog-title">
                                {blog.title}
                            </h2>

                            <p className="admin-blog-description">
                                {blog.description}
                            </p>

                            <button className="admin-blog-btn">
                                Read Story →
                            </button>

                        </div>

                        <div className="admin-blog-image-wrapper">

                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="admin-blog-image"
                            />

                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default AdminBlogSection;