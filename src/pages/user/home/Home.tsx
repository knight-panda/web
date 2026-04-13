import Carousel from "../../../components/carousel/Carousel";
import Products from "../../user/products/Products";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  storeId: string;
  store: any; // replace with proper type if available
};

const Home = () => {
  const { storeId, store } = useOutletContext<OutletContextType>();

  return (
    <div>
      <Carousel storeId={storeId} />
      <Products storeId={storeId} />
    </div>
  );
};

export default Home;