"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface BlurTextProps {
    text?: string;
    delay?: number;
    className?: string;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    threshold?: number;
    rootMargin?: NonNullable<Parameters<typeof useInView>[1]>['margin'];
    animationFrom?: Variants;
    animationTo?: Variants;
    easing?: string; // Simplification, can expose more motion transition props
    onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
    text = "",
    delay = 200,
    className = "",
    animateBy = "words",
    direction = "top",
    threshold = 0.1,
    rootMargin = "0px",
    animationFrom,
    animationTo,
    easing = "easeOutCubic",
    onAnimationComplete,
}) => {
    const elements = animateBy === "words" ? text.split(" ") : text.split("");
    const ref = useRef<HTMLParagraphElement>(null);
    const inView = useInView(ref, { once: true, amount: threshold, margin: rootMargin });

    const defaultFrom: any =
        direction === "top"
            ? { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,-50px,0)" }
            : { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,50px,0)" };

    const defaultTo: any = [
        {
            filter: "blur(5px)",
            opacity: 0.5,
            transform:
                direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
        },
        { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
    ];

    return (
        <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    initial={animationFrom || defaultFrom}
                    animate={inView ? (animationTo || defaultTo) : (animationFrom || defaultFrom)}
                    transition={{
                        duration: 0.5,
                        delay: index * (delay / 1000),
                        ease: "easeOut",
                    }}
                    className="inline-block will-change-transform will-change-filter will-change-opacity"
                    onAnimationComplete={
                        index === elements.length - 1 ? onAnimationComplete : undefined
                    }
                >
                    {element === " " ? "\u00A0" : element}
                    {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </p>
    );
};

export default BlurText;
