import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogPost.css";

function BlogPost() {
    const { slug } = useParams();

    // Dummy blog post data
    const blogPosts = {
        "hello world": {
            title: "hello world",
            date: "october 19, 2025",
            content: [
                {
                    type: "paragraph",
                    text: "hello world! this is my first blog post on this new refreshed webpage. i'm in the process of redesigning my website and i thought that it'd be cool to have a blog page to document my thoughts as well as my journey as a person as well as a software engineer."
                },
                {
                    type: "heading",
                    text: "a fresh look"
                },
                {
                    type: "paragraph",
                    text: "the goal is simple: create a cleaner, more minimal experience. i want the site to feel lighter and more focused. less noise, more signal."
                },
                {
                    type: "paragraph",
                    text: "i've been thinking a lot about how i want to present myself online. the old design worked, but i honestly got a little tired of it. this refresh is about change, how change can be good, and how change is necessary to grow."
                },
                {
                    type: "heading",
                    text: "what's changing"
                },
                {
                    type: "paragraph",
                    text: "one of the bigger changes is adding live nyse ticker data at the top of the site. it's a small detail, but it represents something important to me. my interest in markets and how they move."
                },
                {
                    type: "paragraph",
                    text: "this redesign is a work in progress, and i'll keep iterating as i go. excited to see where it lands."
                }
            ]
        }
    };

    const post = blogPosts[slug] || blogPosts["hello-world"];

    return (
        <div className="blog-post-page">
            <main className="blog-post-content">
                <div className="blog-post-container">
                    <Link to="/blog" className="back-link">
                        ← blog
                    </Link>
                    
                    <h1 className="post-main-title">{post.title}</h1>
                    <p className="post-main-date">{post.date}</p>

                    <div className="post-body">
                        {post.content.map((block, index) => {
                            if (block.type === "paragraph") {
                                return <p key={index} className="post-paragraph">{block.text}</p>;
                            } else if (block.type === "heading") {
                                return <h2 key={index} className="post-heading">{block.text}</h2>;
                            } else if (block.type === "callout") {
                                return (
                                    <div key={index} className="post-callout">
                                        <span className="callout-icon">💡</span>
                                        <p className="callout-text">{block.text}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BlogPost;
