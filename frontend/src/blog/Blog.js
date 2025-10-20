import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
    const blogEntries = [
        {
            year: "2025",
            posts: [
                {
                    title: "building in public",
                    date: "jan 2025",
                    slug: "building-in-public"
                },
                {
                    title: "hello world",
                    date: "jan 2025",
                    slug: "hello-world"
                }
            ]
        },
        {
            year: "2024",
            posts: [
                {
                    title: "reflections on 2024",
                    date: "dec 2024",
                    slug: "reflections-2024"
                },
                {
                    title: "why i love matcha",
                    date: "oct 2024",
                    slug: "why-i-love-matcha"
                },
                {
                    title: "exploring web3",
                    date: "sep 2024",
                    slug: "exploring-web3"
                },
                {
                    title: "my favorite running routes",
                    date: "jul 2024",
                    slug: "running-routes"
                },
                {
                    title: "building with ai",
                    date: "apr 2024",
                    slug: "building-with-ai"
                },
                {
                    title: "adventures with obi",
                    date: "feb 2024",
                    slug: "adventures-with-obi"
                }
            ]
        },
        {
            year: "2023",
            posts: [
                {
                    title: "favorite beli spots",
                    date: "nov 2023",
                    slug: "favorite-beli-spots"
                },
                {
                    title: "learning in public",
                    date: "aug 2023",
                    slug: "learning-in-public"
                },
                {
                    title: "pnw hiking guide",
                    date: "jun 2023",
                    slug: "pnw-hiking-guide"
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
