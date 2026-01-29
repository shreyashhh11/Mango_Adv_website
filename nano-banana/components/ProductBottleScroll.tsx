"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Product } from '@/data/products';

interface ProductBottleScrollProps {
    product: Product;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const totalFrames = product.frameCount || 120;
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Preload images
    useEffect(() => {
        setIsLoaded(false);
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        const ext = product.imageExtension || 'webp';

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${product.folderPath}/${i}.${ext}`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [product, totalFrames]);

    // Draw to canvas
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas || !isLoaded || images.length === 0) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const index = Math.min(
                Math.max(Math.floor(frameIndex.get()), 0),
                images.length - 1
            );

            const img = images[index];

            // Responsive canvas sizing
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            // Draw image "contain" style
            const hRatio = rect.width / img.width;
            const vRatio = rect.height / img.height;
            const ratio = Math.min(hRatio, vRatio);

            const centerShift_x = (rect.width - img.width * ratio) / 2;
            const centerShift_y = (rect.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        // Initial render
        if (isLoaded) requestAnimationFrame(render);

        return () => unsubscribe();
    }, [frameIndex, isLoaded, images]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full max-w-[800px] max-h-[800px] object-contain"
                />
            </div>
        </div>
    );
}
