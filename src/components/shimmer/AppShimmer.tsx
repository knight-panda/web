import "./AppShimmer.css";

const AppShimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-header shimmer"></div>

      <div className="shimmer-banner shimmer"></div>

      <div className="shimmer-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-image shimmer"></div>
            <div className="shimmer-text shimmer"></div>
            <div className="shimmer-text small shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppShimmer;