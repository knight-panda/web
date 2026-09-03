import { useEffect, useState } from "react";
import "./Carousel.css";
import carouselConfig from "./carousel.json";
import { usePublicCarousel } from "../../hooks/user/usePublicStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  storeId: string;
};

const Carousel = ({ storeId }: Props) => {
  const styles = (carouselConfig as any).styles;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < 1024
  );

  const { fetchCarousel, data } = usePublicCarousel();

  useEffect(() => {
    if (storeId) {
      fetchCarousel(storeId);
    }
  }, [storeId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const desktopImages =
    data?.data?.map(
      (item: any) => item.imageUrl
    ) || [];

  const mobileImages =
    data?.data?.map(
      (item: any) =>
        item.mobileImageUrl || item.imageUrl
    ) || [];

  const currentImages = isMobile
    ? mobileImages
    : desktopImages;

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === currentImages.length - 1) {
        return styles.infiniteLoop
          ? 0
          : prev;
      }

      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return styles.infiniteLoop
          ? currentImages.length - 1
          : 0;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    if (
      !styles.autoPlay ||
      paused ||
      currentImages.length === 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (
          prev ===
          currentImages.length - 1
        ) {
          return styles.infiniteLoop
            ? 0
            : prev;
        }

        return prev + 1;
      });
    }, styles.slideDuration);

    return () => clearInterval(timer);
  }, [
    currentImages.length,
    paused,
    styles.autoPlay,
    styles.slideDuration,
    styles.infiniteLoop
  ]);

  if (!currentImages.length) {
    return (
      <div className="slider">
        No banners available
      </div>
    );
  }

  return (
    <div
      className="slider"
      onMouseEnter={() =>
        styles.pauseOnHover &&
        setPaused(true)
      }
      onMouseLeave={() =>
        styles.pauseOnHover &&
        setPaused(false)
      }
      style={{
        maxWidth: styles.maxWidth,
        width: styles.width,
        backgroundColor:
          styles.backgroundColor,
        borderRadius:
          styles.borderRadius,
        aspectRatio: isMobile
          ? styles.mobileAspectRatio
          : styles.desktopAspectRatio,
        margin: isMobile
          ? styles.mobileMargin
          : styles.desktopMargin,
        boxShadow: styles.showShadow
          ? styles.shadow
          : "none",
        border: styles.showBorder
          ? styles.border
          : "none"
      }}
    >
      {currentImages.map(
        (
          img: string,
          index: number
        ) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1
              }`}
            loading={
              styles.lazyLoad
                ? "lazy"
                : "eager"
            }
            className={`slide ${index === currentIndex
              ? "active"
              : ""
              }`}
            style={{
              objectFit:
                styles.objectFit,
              transition: `opacity ${styles.transitionDuration} ease-in-out`
            }}
          />
        )
      )}

      {isMobile
        ? false : styles.showArrows && (
          <>
            <button
              type="button"
              aria-label="Previous Slide"
              className="carousel-arrow left"
              onClick={prevSlide}
              style={{
                width: styles.arrowSize,
                height: styles.arrowSize,
                background:
                  styles.arrowBackground,
                color: styles.arrowColor,
                borderRadius:
                  styles.arrowBorderRadius
              }}
            >
              <FaChevronLeft
                style={{
                  width: styles.arrowIconSize,
                  height: styles.arrowIconSize,
                }} />
            </button>

            <button
              type="button"
              aria-label="Next Slide"
              className="carousel-arrow right"
              onClick={nextSlide}
              style={{
                width: styles.arrowSize,
                height: styles.arrowSize,
                background:
                  styles.arrowBackground,
                color: styles.arrowColor,
                borderRadius:
                  styles.arrowBorderRadius
              }}
            >
              <FaChevronRight
                style={{
                  width: styles.arrowIconSize,
                  height: styles.arrowIconSize,
                }} />
            </button>
          </>
        )}

      {styles.showDots && (
        <div className="carousel-dots">
          {currentImages.map(
            (_, index) => (
              <span
                key={index}
                onClick={() =>
                  setCurrentIndex(
                    index
                  )
                }
                style={{
                  width:
                    styles.dotSize,
                  height:
                    styles.dotSize,
                  margin: `0 ${styles.dotGap}`,
                  background:
                    currentIndex ===
                      index
                      ? styles.activeDotColor
                      : styles.dotColor,
                  borderRadius:
                    "50%",
                  display:
                    "inline-block",
                  cursor:
                    "pointer"
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;