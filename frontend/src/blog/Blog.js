import React from "react";
import "./Blog.css";
import BottomNav from "../components/BottomNav";

function Blog() {
    const blogEntries = [
        {
            year: "2025",
            posts: [
                {
                    title: "hello world",
                    date: "Jan 2025"
                }
            ]
        }
    ];

    return (
        <div className="blog-page">
            <main className="blog-content">
                {blogEntries.map((yearGroup, index) => (
                    <div key={index} className="year-section">
                        <h2 className="year-title">{yearGroup.year}</h2>
                        <div className="posts-list">
                            {yearGroup.posts.map((post, postIndex) => (
                                <div key={postIndex} className="post-item">
                                    <span className="post-title">{post.title}</span>
                                    <span className="post-date">{post.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            <BottomNav />
        </div>
    );
}

export default Blog;
