import { useUserStoreBlogs } from "../../../hooks/user/storeBlogs/useUserStoreBlogs";
import "./BlogSection.css";
import { useEffect } from "react";

interface Props {
    storeId: string;
}

const BlogSection = ({ storeId }: Props) => {

    const {
        blogs,
        loading,
        error,
        fetchBlogs
    } = useUserStoreBlogs();

    useEffect(() => {

        if (storeId) {
            fetchBlogs(storeId);
        }

    }, [storeId]);

    if (loading) {
        return (
            <div className="blogs-container">
                Loading blogs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="blogs-container">
                {error}
            </div>
        );
    }

    if (blogs.length === 0) {
        return null;
    }

    return (
        <div className="blogs-container">

            {blogs.map((blog, index) => {

                const reverse =
                    index % 2 !== 0;

                return (

                    <section
                        key={blog.blogId}
                        className={`blog-section ${
                            reverse
                                ? "blog-section-reverse"
                                : ""
                        }`}
                    >
                        <div className="blog-content">

                            <span className="blog-tagline">
                                {blog.tagline}
                            </span>

                            <h2 className="blog-title">
                                {blog.title}
                            </h2>

                            <p className="blog-description">
                                {blog.description}
                            </p>

                            <button className="blog-btn">
                                Read Story →
                            </button>

                        </div>

                        <div className="blog-image-wrapper">

                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="blog-image"
                            />

                        </div>
                    </section>

                );
            })}

        </div>
    );
};

export default BlogSection;