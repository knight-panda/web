import Carousel from "../../../components/carousel/Carousel";
import Products from "../../user/products/Products";
import { useOutletContext } from "react-router-dom";
import BlogSection from "../blog/BlogSection";
import ReelsUser from "../reels/ReelsUser";
import type { Store } from "../../../models/store/response/SingleStoreResponse";

type OutletContextType = {
  storeId: string;
  storeData: Store; // replace with proper type if available
};

const Home = () => {
  const { storeId, storeData } = useOutletContext<OutletContextType>();

  return (
    <div>
      <Carousel storeId={storeId} />
      <Products storeId={storeId} storeData={storeData} />
      <BlogSection storeId={storeId} />
      <ReelsUser storeId={storeId} />
    </div>
  );
};

export default Home;