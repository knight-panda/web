import { useState } from "react";
import "./CourseDetails.css";

const lessons = [
    {
        courseLessonId: "1",
        title: "Introduction to Kotlin",
        duration: 900,
        thumbnail: "https://storage.googleapis.com/crazoweb-storage/products/7b6ed8bd-43c0-41e5-8d5d-8d1b6a40653c_Blue_White_and_Yellow_Modern_Viral_AI_Images_YouTube_Thumbnail.png",
        videoUrl: "https://www.youtube.com/embed/2Mz_vyn7fT0",
        content: "<h2>Welcome</h2>"
    },
    {
        courseLessonId: "2",
        title: "Variables & Data Types",
        duration: 1200,
        thumbnail: "https://storage.googleapis.com/crazoweb-storage/products/7b6ed8bd-43c0-41e5-8d5d-8d1b6a40653c_Blue_White_and_Yellow_Modern_Viral_AI_Images_YouTube_Thumbnail.png",
        videoUrl: "https://www.youtube.com/embed/1qW4At9BBnw",
        content: "<h2>Variables</h2>"
    },
    {
        courseLessonId: "3",
        title: "Functions",
        duration: 1500,
        thumbnail: "https://storage.googleapis.com/crazoweb-storage/products/7b6ed8bd-43c0-41e5-8d5d-8d1b6a40653c_Blue_White_and_Yellow_Modern_Viral_AI_Images_YouTube_Thumbnail.png",
        videoUrl: "https://www.youtube.com/embed/2Mz_vyn7fT0",
        content: "<h2>Functions</h2>"
    }
];

export default function CourseDetailsPage() {
    const [selectedLesson, setSelectedLesson] = useState(lessons[0]);

    return (
        <div className="course-details">

            <div className="course-header">

                <img
                    src={selectedLesson.thumbnail}
                    alt=""
                    className="course-banner"
                />

                <div className="course-info">

                    <h1>Complete Android Development with Kotlin</h1>

                    <p>
                        Learn Android using Kotlin, MVVM,
                        Room, Firebase, Retrofit,
                        Jetpack Compose and more.
                    </p>

                    <div className="course-tags">
                        <span>⭐ 4.8 Rating</span>
                        <span>⏱ 42.5 Hours</span>
                        <span>📚 36 Lessons</span>
                    </div>

                    <div className="price">
                        <span className="new-price">₹999</span>
                        <span className="old-price">₹4999</span>
                    </div>

                </div>

            </div>

            <div className="course-body">

                <div className="lesson-sidebar">

                    <h3>Course Content</h3>

                    {lessons.map((lesson, index) => (

                        <div
                            key={lesson.courseLessonId}
                            className={`lesson-item ${selectedLesson.courseLessonId === lesson.courseLessonId
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() => setSelectedLesson(lesson)}
                        >

                            <div className="lesson-left">

                                <div className="lesson-icon">
                                    ▶
                                </div>

                                <div className="lesson-info">

                                    <h4>{lesson.title}</h4>

                                    <p>
                                        Lesson {index + 1}
                                    </p>

                                </div>

                            </div>

                            <span className="lesson-time">
                                {Math.floor(lesson.duration / 60)} min
                            </span>

                        </div>

                    ))}

                </div>

                <div className="lesson-content">

                    <div className="video-container">

                        <iframe
                            src={selectedLesson.videoUrl}
                            title="Lesson Video"
                            allowFullScreen
                        />

                    </div>

                    <h2>{selectedLesson.title}</h2>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: selectedLesson.content,
                        }}
                    />

                </div>

            </div>

        </div>
    );
}