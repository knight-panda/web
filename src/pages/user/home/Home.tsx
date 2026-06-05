import Carousel from "../../../components/carousel/Carousel";
import Products from "../../user/products/Products";
import { useOutletContext } from "react-router-dom";
import BlogSection from "../blog/BlogSection";
import ReelsUser from "../reels/ReelsUser";

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
      <BlogSection storeId={storeId} />
      <ReelsUser />
    </div>
  );
};

export default Home;