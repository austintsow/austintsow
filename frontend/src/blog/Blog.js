import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
    const blogEntries = [
        {
            year: "2025",
            posts: [
                {
                    title: "hello world",
                    date: "oct 2025",
                    slug: "hello world"
                }
            ]
        }
    ];

    return (
        <div className="blog-page">
            <main className="blog-content">
                <div className="blog-container">
                    {blogEntries.map((yearGroup, index) => (
                        <div key={index} className="year-section">
                            <h2 className="year-title">{yearGroup.year}</h2>
                            <div className="posts-list">
                                {yearGroup.posts.map((post, postIndex) => (
                                    <Link 
                                        key={postIndex} 
                                        to={`/blog/${post.slug}`}
                                        className="post-item"
                                    >
                                        <span className="post-title">{post.title}</span>
                                        <span className="post-date">{post.date}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Blog;
