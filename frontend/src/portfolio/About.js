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
                            i'm a software engineer with a computer science degree from
                            gonzaga university (go zags). after graduating, i joined
                            visa's device intelligence team and have since moved to temu's
                            search engine marketing team.
                        </p>
                        <p>
                            outside of work you'll usually find me on a pickleball court,
                            out on a run, or hunting down new restaurants around seattle
                            to expand my culinary horizons. i rate everything i eat on
                            beli, 615+ restaurants and growing, so come find me @tsow.
                        </p>
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
