import React from "react";
import { motion } from "framer-motion";
import photo from "./austin.jpg";
import "./About.css";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: "easeOut" },
};

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about-mast">about</div>
            <div className="about-band">
                <div className="about-inner">
                    <motion.div className="about-text" {...fadeUp}>
                        <h3>hello, i'm austin.</h3>
                        <p>
                            i'm a recent grad from gonzaga university (cs, software
                            security concentration), wrapping up my time at visa on the
                            device intelligence team and looking for my next opportunity.
                        </p>
                        <p>
                            i enjoy building systems that hold up at scale and interfaces
                            that feel good to use, and i'm big on ai: multi-agent
                            orchestration, llm tooling, and letting agents handle the
                            boring parts... and some of the fun ones too.
                        </p>
                        <p>
                            outside of work you'll usually find me on a pickleball court,
                            training for the seattle half marathon (my first!), or
                            hunting down new restaurants to expand my culinary horizons. i rate everything i
                            eat on beli, 615+ restaurants and growing, so come find me
                            @tsow.
                        </p>
                        <div className="about-tags">
                            <span className="about-tag">sammamish, wa</span>
                            <span className="about-tag">ai agents</span>
                            <span className="about-tag">software engineer</span>
                            <span className="about-tag">i like food</span>
                            <span className="about-tag">pickleballer</span>
                            <span className="about-tag">runner?</span>
                        </div>
                    </motion.div>
                    <motion.div
                        className="about-photo"
                        {...fadeUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    >
                        <img src={photo} alt="austin tsow" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
