"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Dynamic Background */}
                    <div
                        className="fixed inset-0 z-0 transition-colors duration-1000"
                        style={{ background: product.gradient }}
                    />

                    {/* Scroll Experience */}
                    <div className="relative z-10">
                        <div className="relative">
                            <ProductBottleScroll product={product} />
                            <ProductTextOverlays product={product} />
                        </div>

                        {/* Content Sections */}
                        <div className="relative bg-white z-20 rounded-t-[3rem] -mt-20 shadow-2xl overflow-hidden">

                            {/* Details Section */}
                            <motion.section
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="py-24 px-6 container mx-auto"
                            >
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h3 className="text-orange-500 font-bold tracking-widest uppercase mb-4">The Details</h3>
                                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">{product.detailsSection.title}</h2>
                                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                            {product.detailsSection.description}
                                        </p>
                                        <div className="grid grid-cols-3 gap-6">
                                            {product.stats.map((stat, i) => (
                                                <div key={i} className="bg-gray-50 p-6 rounded-2xl text-center">
                                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.val}</div>
                                                    <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 rounded-3xl h-[600px] w-full flex items-center justify-center text-gray-400">
                                        {/* Placeholder for detail image - in real app would be an <img> */}
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">📸</div>
                                            <p>{product.detailsSection.imageAlt}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Freshness Section */}
                            <motion.section
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="py-24 px-6 bg-gray-50"
                            >
                                <div className="container mx-auto text-center max-w-4xl">
                                    <h3 className="text-orange-500 font-bold tracking-widest uppercase mb-4">Process</h3>
                                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">{product.freshnessSection.title}</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed mb-12">
                                        {product.freshnessSection.description}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {product.features.map((feature, i) => (
                                            <span key={i} className="px-6 py-3 bg-white rounded-full shadow-sm text-gray-800 font-medium border border-gray-100">
                                                ✨ {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>

                            {/* Buy Now Section */}
                            <motion.section
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="py-24 px-6 container mx-auto"
                            >
                                <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-gradient-to-bl from-gray-800 to-black pointer-events-none" />

                                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h2 className="text-5xl md:text-7xl font-bold mb-6">{product.name}</h2>
                                            <div className="flex items-baseline gap-4 mb-8">
                                                <span className="text-4xl md:text-6xl font-bold text-orange-500">{product.buyNowSection.price}</span>
                                                <span className="text-xl text-gray-400">{product.buyNowSection.unit}</span>
                                            </div>
                                            <div className="space-y-4 mb-12">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    {product.buyNowSection.deliveryPromise}
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    {product.buyNowSection.returnPolicy}
                                                </div>
                                            </div>
                                            <button className="w-full md:w-auto px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                                                Add to Cart
                                            </button>
                                        </div>
                                        <div className="hidden md:block">
                                            {/* Abstract visual or bottle shot could go here */}
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Next Flavor CTA */}
                            <div className="bg-gray-900 py-12 text-center cursor-pointer hover:bg-gray-800 transition-colors" onClick={nextProduct}>
                                <p className="text-gray-500 uppercase tracking-widest mb-2">Next Flavor</p>
                                <h3 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-4 group">
                                    {products[(currentIndex + 1) % products.length].name}
                                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </h3>
                            </div>

                            <Footer />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl border border-white/10">
                <button onClick={prevProduct} className="hover:text-orange-500 transition-colors">← Prev</button>
                <div className="flex gap-2">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-600 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
                <button onClick={nextProduct} className="hover:text-orange-500 transition-colors">Next →</button>
            </div>
        </main>
    );
}
