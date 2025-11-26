import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogPost.css";

function BlogPost() {
    const { slug } = useParams();

    // Dummy blog post data
    const blogPosts = {
        "landing a swe role while finishing up my degree": {
            title: "landing a swe role while finishing up my degree",
            date: "november 26, 2025",
            content: [
                {
                    type: "paragraph",
                    text: "i'm excited to share that i've landed a full-time software engineering role for after graduation! with december 2025 around the corner, it feels like christmas came early. this moment is a testament to the fact that hard work really does pay off."
                },
                {
                    type: "paragraph",
                    text: "graduating in december 2025 felt both close and far away throughout this process. but now, knowing that i'll be stepping into a full-time swe role right after, makes everything feel worth it. the late nights, the leetcode grind, the focused applications: it all led to this."
                },
                {
                    type: "heading",
                    text: "the journey"
                },
                {
                    type: "paragraph",
                    text: "landing this role wasn't easy, but it taught me a lot about myself and the job search process. i want to share some of the things that worked for me, in case they help someone else going through the same journey."
                },
                {
                    type: "heading",
                    text: "application strategy: quality over quantity"
                },
                {
                    type: "paragraph",
                    text: "one of the most important lessons i learned was to apply to meaningful places: companies where i could genuinely see myself working long-term. it's tempting to mass-apply to hundreds of companies, but i found more success when i focused on quality applications."
                },
                {
                    type: "paragraph",
                    text: "take the time to research the company, understand their mission, and tailor your application. when you can articulate why you want to work somewhere specifically, it shows through in your cover letter and interviews. recruiters can tell when you're genuinely interested versus just sending out generic applications."
                },
                {
                    type: "heading",
                    text: "interview prep: neetcode 150 and communication"
                },
                {
                    type: "paragraph",
                    text: "for technical interview prep, neetcode 150 was a game changer. the curated list of problems covers all the essential patterns you need to know, without the overwhelm of trying to do every single leetcode problem. i focused on understanding patterns rather than memorizing solutions, and that made all the difference."
                },
                {
                    type: "paragraph",
                    text: "but here's something equally important: be super communicative with your recruiter. i can't stress this enough. recruiters are there to help you succeed. they want you to do well. don't be afraid to ask questions, request feedback, or clarify expectations. they can provide insights about the interview process, the team, and even tips specific to their company."
                },
                {
                    type: "paragraph",
                    text: "building a good relationship with your recruiter can make the whole process smoother. they're your advocate inside the company, so treat them as a partner in your job search journey."
                },
                {
                    type: "heading",
                    text: "hard work pays off"
                },
                {
                    type: "paragraph",
                    text: "looking back, the biggest takeaway is that consistency and genuine effort really do pay off. there were moments of doubt, rejections that stung, and times when i wondered if i was good enough. but i kept going, kept improving, and kept believing in myself."
                },
                {
                    type: "paragraph",
                    text: "if you're in the middle of your job search right now, especially while balancing school, know that it's hard but possible. focus on companies you care about, prepare strategically, and don't underestimate the power of good communication with recruiters."
                },
                {
                    type: "paragraph",
                    text: "christmas really did come early this year, and i couldn't be more grateful for the opportunity ahead. here's to finishing strong and starting the next chapter! 🎄"
                }
            ]
        },
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
