import { useState } from "react";
import "./AdminBlogSection.css";
import AddBlogDialog from "./AddBlogDialog";

export interface BlogModel {
    blogId: string;
    tagline: string;
    title: string;
    description: string;
    imageUrl: string;
}

const AdminBlogSection = () => {
    const [showDialog, setShowDialog] = useState(false);
    const blogs: BlogModel[] = [
        {
            blogId: "1",
            tagline: "BEHIND THE BRAND",
            title:
                "How We Craft Every Product With Care. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create.",
            description:
                "From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create.",
            imageUrl:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9"
        },
        {
            blogId: "2",
            tagline: "OUR JOURNEY",
            title: "From Small Idea To Trusted Brand.",
            description:
                "Learn how our brand started and the values that guide every decision we make.",
            imageUrl:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        },
        {
            blogId: "3",
            tagline: "CRAFTSMANSHIP",
            title: "Every Detail Matters.",
            description:
                "Discover the process and dedication that goes into every product we create.",
            imageUrl:
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
        }
    ];

    return (
        <div className="admin-blogs-container">
            <AddBlogDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onSave={(blog) => {
                    console.log(blog);
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

            {blogs.map((blog, index) => {
                const reverse = index % 2 !== 0;

                return (
                    <section
                        key={blog.blogId}
                        className={`admin-blog-section ${reverse ? "admin-blog-section-reverse" : ""
                            }`}
                    >
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