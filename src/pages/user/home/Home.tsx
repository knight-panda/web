import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Home.css"

import { useOutletContext } from "react-router-dom";

import type { Store } from "../../../models/store/response/SingleStoreResponse";

// ==================================================
// Lazy Loaded Components
// ==================================================

const Carousel = lazy(
  () => import("../../../components/carousel/Carousel")
);

const Products = lazy(
  () => import("../../user/products/Products")
);

const BlogSection = lazy(
  () => import("../blog/BlogSection")
);

const ReelsUser = lazy(
  () => import("../reels/ReelsUser")
);

const Course = lazy(
  () => import("../course/Course")
);

// ==================================================
// Types
// ==================================================

type OutletContextType = {
  storeId: string;
  storeData: Store;
};

type SectionType =
  | "carousel"
  | "course"
  | "products"
  | "blog"
  | "reels";

type HomeSection = {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;

  settings?: {
    desktopHeight?: number;
    tabletHeight?: number;
    mobileHeight?: number;
  };
};

// ==================================================
// Homepage Sections
// ==================================================

const homeSections: HomeSection[] = [
  {
    id: "carousel-1",
    type: "carousel",
    enabled: true,
    order: 1,

    settings: {
      desktopHeight: 500,
      tabletHeight: 400,
      mobileHeight: 250,
    },
  },

  {
    id: "course-1",
    type: "course",
    enabled: true,
    order: 2,

    settings: {
      desktopHeight: 400,
      tabletHeight: 350,
      mobileHeight: 300,
    },
  },

  {
    id: "products-1",
    type: "products",
    enabled: true,
    order: 3,

    settings: {
      desktopHeight: 600,
      tabletHeight: 500,
      mobileHeight: 450,
    },
  },

  {
    id: "blog-1",
    type: "blog",
    enabled: true,
    order: 4,

    settings: {
      desktopHeight: 400,
      tabletHeight: 350,
      mobileHeight: 300,
    },
  },

  {
    id: "reels-1",
    type: "reels",
    enabled: true,
    order: 5,

    settings: {
      desktopHeight: 500,
      tabletHeight: 450,
      mobileHeight: 400,
    },
  },
];

// ==================================================
// Home
// ==================================================

const Home = () => {
  const { storeId, storeData } =
    useOutletContext<OutletContextType>();

  const activeSections = homeSections
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="store-home">
      {activeSections.map((section) => (
        <HomeSection
          key={section.id}
          section={section}
          storeId={storeId}
          storeData={storeData}
        />
      ))}
    </main>
  );
};

// ==================================================
// Home Section
// ==================================================

type HomeSectionProps = {
  section: HomeSection;
  storeId: string;
  storeData: Store;
};

const HomeSection = ({
  section,
  storeId,
  storeData,
}: HomeSectionProps) => {
  const sectionRef =
    useRef<HTMLDivElement | null>(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  // =================================================
  // Intersection Observer
  // =================================================

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    // Fallback for old browsers
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(
            `🚀 Loading section: ${section.type}`
          );

          setShouldLoad(true);

          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // =================================================
  // Section Class
  // =================================================

  const sectionClass = [
    "home-section",
    `home-section-${section.type}`,
  ].join(" ");

  return (
    <section
      ref={sectionRef}
      className={sectionClass}
      style={
        !shouldLoad
          ? {
            "--desktop-height": `${section.settings?.desktopHeight ?? 400}px`,
            "--tablet-height": `${section.settings?.tabletHeight ?? 350}px`,
            "--mobile-height": `${section.settings?.mobileHeight ?? 300}px`,
          } as React.CSSProperties
          : undefined
      }
    >
      {!shouldLoad ? (
        <SectionSkeleton />
      ) : (
        <Suspense fallback={<SectionLoading />}>
          {renderSection(
            section.type,
            storeId,
            storeData
          )}
        </Suspense>
      )}
    </section>
  );
};

// ==================================================
// Render Section
// ==================================================

const renderSection = (
  type: SectionType,
  storeId: string,
  storeData: Store
) => {
  switch (type) {
    case "carousel":
      return (
        <Carousel
          storeId={storeId}
        />
      );

    case "course":
      return <Course />;

    case "products":
      return (
        <Products
          storeId={storeId}
          storeData={storeData}
        />
      );

    case "blog":
      return (
        <BlogSection
          storeId={storeId}
        />
      );

    case "reels":
      return (
        <ReelsUser
          storeId={storeId}
        />
      );

    default:
      return null;
  }
};

// ==================================================
// Section Skeleton
// ==================================================

const SectionSkeleton = () => {
  return (
    <div className="home-section-skeleton">
      <div className="skeleton-content">
        <div className="skeleton-loader" />
      </div>
    </div>
  );
};

// ==================================================
// Section Loading
// ==================================================

const SectionLoading = () => {
  return (
    <div className="home-section-loading">
      <div className="loading-spinner" />
    </div>
  );
};

export default Home;