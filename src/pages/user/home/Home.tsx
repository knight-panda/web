import Carousel from "../../../components/carousel/Carousel";
import Products from "../../user/products/Products";
import { useOutletContext } from "react-router-dom";
import BlogSection from "../blog/BlogSection";
import ReelsUser from "../reels/ReelsUser";

const blogs = [
  {
    blogId: "1",
    tagline: "BEHIND THE BRAND",
    title: "How We Craft Every Product With Care. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create.",
    description:
      "From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create. From selecting the finest materials to the final finishing touches, discover the passion and care behind everything we create.",
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

type OutletContextType = {
  storeId: string;
  store: any; // replace with proper type if available
};

const Home = () => {
  const { storeId } = useOutletContext<OutletContextType>();

  return (
    <div>
      <Carousel storeId={storeId} />
      <Products storeId={storeId} />
      {blogs.map((blog, index) => (
        <BlogSection
          key={blog.blogId}
          blog={blog}
          reverse={index % 2 !== 0}
        />
      ))}
      <ReelsUser />
    </div>
  );
};

export default Home;