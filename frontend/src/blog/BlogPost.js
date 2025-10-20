import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogPost.css";

function BlogPost() {
    const { slug } = useParams();

    // Dummy blog post data
    const blogPosts = {
        "hello-world": {
            title: "hello world",
            date: "january 20, 2025",
            content: [
                {
                    type: "paragraph",
                    text: "this is my first blog post. i've been thinking about writing more and sharing my thoughts, so here we are."
                },
                {
                    type: "paragraph",
                    text: "i'll be writing about things i'm building, learning, and exploring. expect posts about ai, web3, running, matcha, and whatever else catches my attention."
                },
                {
                    type: "heading",
                    text: "why start now?"
                },
                {
                    type: "paragraph",
                    text: "i've realized that writing helps me think more clearly. it forces me to organize my thoughts and articulate ideas that might otherwise stay fuzzy in my head."
                },
                {
                    type: "callout",
                    text: "writing is thinking. if you can't write clearly, you probably don't understand the topic as well as you think."
                },
                {
                    type: "paragraph",
                    text: "so here's to documenting the journey, one post at a time."
                }
            ]
        },
        "building-in-public": {
            title: "building in public",
            date: "january 15, 2025",
            content: [
                {
                    type: "paragraph",
                    text: "i've decided to start building more projects in public. sharing progress, failures, and lessons learned along the way."
                },
                {
                    type: "heading",
                    text: "why build in public?"
                },
                {
                    type: "paragraph",
                    text: "building in public creates accountability. when you share what you're working on, you're more likely to actually finish it. plus, you get feedback early and often."
                },
                {
                    type: "callout",
                    text: "the best way to learn is to teach. building in public forces you to explain your decisions and reasoning."
                },
                {
                    type: "heading",
                    text: "what i'm building"
                },
                {
                    type: "paragraph",
                    text: "right now i'm working on a few side projects involving ai agents, web3 protocols, and some tools to make my daily workflow smoother."
                },
                {
                    type: "paragraph",
                    text: "follow along as i document the process, share code snippets, and write about what i'm learning."
                }
            ]
        },
        "reflections-2024": {
            title: "reflections on 2024",
            date: "december 28, 2024",
            content: [
                {
                    type: "paragraph",
                    text: "2024 was a year of growth, change, and learning. as it comes to a close, i wanted to reflect on what happened and what i learned."
                },
                {
                    type: "heading",
                    text: "highlights"
                },
                {
                    type: "paragraph",
                    text: "shipped multiple projects, explored new technologies, ran my longest distance yet, and spent quality time with obi on countless trails."
                },
                {
                    type: "callout",
                    text: "growth happens outside your comfort zone. this year i pushed myself to try new things and embrace uncertainty."
                },
                {
                    type: "heading",
                    text: "lessons learned"
                },
                {
                    type: "paragraph",
                    text: "consistency beats intensity. showing up every day, even when motivation is low, leads to compound growth over time."
                },
                {
                    type: "paragraph",
                    text: "community matters. surrounding yourself with curious, ambitious people elevates your own thinking and aspirations."
                },
                {
                    type: "heading",
                    text: "looking ahead"
                },
                {
                    type: "paragraph",
                    text: "2025 is about building, shipping, and sharing more. less consuming, more creating. excited for what's ahead."
                }
            ]
        },
        "why-i-love-matcha": {
            title: "why i love matcha",
            date: "october 12, 2024",
            content: [
                {
                    type: "paragraph",
                    text: "matcha has become my go-to drink. it's calming yet energizing, and the ritual of making it is meditative."
                },
                {
                    type: "heading",
                    text: "the perfect energy"
                },
                {
                    type: "paragraph",
                    text: "unlike coffee, matcha gives you sustained energy without the jitters or crash. the l-theanine provides a calm focus that's perfect for deep work."
                },
                {
                    type: "callout",
                    text: "matcha is the ultimate productivity drink. smooth energy, clear focus, no crash."
                },
                {
                    type: "heading",
                    text: "the ritual"
                },
                {
                    type: "paragraph",
                    text: "making matcha is an intentional process. whisking the powder, watching it foam, taking that first sip—it's a mindful moment in an otherwise busy day."
                },
                {
                    type: "paragraph",
                    text: "if you haven't tried matcha yet, this is your sign to give it a shot."
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
