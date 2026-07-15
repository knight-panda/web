import React from "react";
import "./Course.css";

const courses = [
  {
    id: 1,
    title: "Complete Android Development",
    thumbnail: "https://picsum.photos/400/220?random=1",
    price: 4999,
    discountPrice: 999,
    duration: "42 Hours",
    status: "Published",
    lessons: 36,
  },
  {
    id: 2,
    title: "React JS Masterclass",
    thumbnail: "https://picsum.photos/400/220?random=2",
    price: 3999,
    discountPrice: 799,
    duration: "28 Hours",
    status: "Draft",
    lessons: 24,
  },
  {
    id: 2,
    title: "React JS Masterclass",
    thumbnail: "https://picsum.photos/400/220?random=2",
    price: 3999,
    discountPrice: 799,
    duration: "28 Hours",
    status: "Draft",
    lessons: 24,
  },
];

const Course = () => {
  return (
    <div className="course-page">
      <div className="course-header">
        <div>
          <h2>Courses</h2>
          <p>Manage your online courses.</p>
        </div>

      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />

              <div className="course-overlay">
                <span className="course-duration">
                  ⏱ {course.duration}
                </span>
              </div>
            </div>

            <div className="course-content">
              <h3>{course.title}</h3>

              <div className="course-meta">
                <span>🎥 {course.lessons} Lessons</span>
                <span>⭐ Beginner</span>
              </div>

              <div className="course-price">
                <span className="new-price">₹{course.discountPrice}</span>
                <span className="old-price">₹{course.price}</span>
              </div>

              <div className="course-actions">
                <button className="lesson-btn">View Lessons</button>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;