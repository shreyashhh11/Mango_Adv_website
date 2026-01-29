"use client";
import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Product } from '@/data/products';

interface ProductTextOverlaysProps {
    product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const OpacitySection = ({ start, end, children }: { start: number, end: number, children: React.ReactNode }) => {
        const opacity = useTransform(scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [0, 1, 1, 0]
        );
        const y = useTransform(scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [50, 0, 0, -50]
        );

        return (
            <motion.div style={{ opacity, y }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center max-w-4xl px-6">
                    {children}
                </div>
            </motion.div>
        );
    };

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] pointer-events-none">
            <div className="sticky top-0 h-screen w-full">
                {/* Section 1: Intro */}
                <OpacitySection start={0.0} end={0.2}>
                    <h1 className="text-6xl md:text-9xl font-bold mb-4 tracking-tighter text-gray-900">{product.section1.title}</h1>
                    <p className="text-2xl md:text-4xl font-light text-gray-600">{product.section1.subtitle}</p>
                </OpacitySection>

                {/* Section 2: Flavor */}
                <OpacitySection start={0.25} end={0.45}>
                    <h2 className="text-5xl md:text-8xl font-bold mb-6 text-gray-900">{product.section2.title}</h2>
                    <p className="text-xl md:text-3xl text-gray-700 max-w-2xl mx-auto">{product.section2.subtitle}</p>
                </OpacitySection>

                {/* Section 3: Benefits */}
                <OpacitySection start={0.5} end={0.7}>
                    <h2 className="text-5xl md:text-8xl font-bold mb-6 text-gray-900">{product.section3.title}</h2>
                    <p className="text-xl md:text-3xl text-gray-700 max-w-2xl mx-auto">{product.section3.subtitle}</p>
                </OpacitySection>

                {/* Section 4: Pure */}
                <OpacitySection start={0.75} end={0.95}>
                    <h2 className="text-5xl md:text-8xl font-bold mb-6 text-gray-900">{product.section4.title}</h2>
                    <p className="text-xl md:text-3xl text-gray-700">{product.section4.subtitle}</p>
                </OpacitySection>
            </div>
        </div>
    );
}
