import { useEffect, useState } from "react";
import "./Carousel.css";
import { usePublicCarousel } from "../../hooks/user/usePublicStore";

type Props = {
  storeId: string;
};

const Carousel = ({ storeId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const { fetchCarousel, data } = usePublicCarousel();

  // ✅ Fetch API data
  useEffect(() => {
    if (storeId) {
      fetchCarousel(storeId);
    }
  }, [storeId]);

  // ✅ Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Extract images from API
  const desktopImages =
    data?.data?.map((item: any) => item.imageUrl) || [];

  const mobileImages =
    data?.data?.map((item: any) => item.mobileImageUrl || item.imageUrl) || [];

  const currentImages = isMobile ? mobileImages : desktopImages;

  // ✅ Auto slide
  useEffect(() => {
    if (currentImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [currentImages]);

  // ⏳ fallback UI
  if (!currentImages.length) {
    return <div className="slider">No banners available</div>;
  }

  return (
    <div className="slider">
      {currentImages.map((img: string, index: number) => (
        <img
          key={index}
          src={img}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          alt={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Carousel;