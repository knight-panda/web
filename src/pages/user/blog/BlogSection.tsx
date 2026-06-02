import "./BlogSection.css";

export interface BlogModel {
    blogId: string;
    tagline: string;
    title: string;
    description: string;
    imageUrl: string;
}

interface Props {
    blog: BlogModel;
    reverse?: boolean;
}

const BlogSection = ({ blog, reverse = false }: Props) => {
    return (
        <section
            className={`blog-section ${reverse ? "blog-section-reverse" : ""
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
};

export default BlogSection;