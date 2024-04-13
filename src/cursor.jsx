import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BlurryCursor = ({ isActive }) => {
    const colors = [
        "#c32d27", "#f5c63f", "#457ec4", "#356fdb",
    ];
    const circles = useRef([]);
    const size = 30;
    const delay = 0.1; // Assuming delay is defined somewhere

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        moveCircles(clientX, clientY);
    }

    const moveCircles = (x, y) => {
        if (circles.current.length < 1) return;
        circles.current.forEach((circle, i) => {
            gsap.set(circle, { x, y, xPercent: -50, yPercent: -50 });
        });
    }

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
        };
    }, []);

    return (
        <div className='relative h-screen'>
            {colors.map((color, i) => (
                <div 
                    style={{
                        backgroundColor: color,
                        width: size,
                        height: size,
                        filter: `blur(${isActive ? 20 : 2}px)`,
                        transition: `transform ${(4 - i) * delay}s linear, height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`
                    }}
                    className='top-0 left-0 fixed rounded-full mix-blend-difference' 
                    key={i} 
                    ref={ref => circles.current[i] = ref}
                />
            ))}
        </div>
    );
};

export default BlurryCursor;
