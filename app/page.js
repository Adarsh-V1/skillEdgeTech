'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import PortfolioSection from "./components/PortfolioSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import ClientLogos from "./components/ClientLogos";
import FAQSection from "./components/FAQSection";
import dynamic from "next/dynamic";
import ScrollIndicator from "./components/ScrollIndicator";
import StickyCTA from "./components/StickyCTA";
import StatsCounter from "./components/StatsCounter";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import Navbar from "./components/Navbar";

const BlogSection = dynamic(() => import("./components/BlogSection"), { ssr: false, loading: () => <div /> });
const NewsletterSignup = dynamic(() => import("./components/NewsletterSignup"), { ssr: false, loading: () => <div /> });

export default function Home() {
	const [showTop, setShowTop] = useState(false);

	useEffect(() => {
		const onScroll = () => setShowTop(window.scrollY > 200);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<Navbar />
			<ScrollIndicator />
			<StickyCTA />
			<div className="w-full">
				<section className="pt-[96px] md:pt-[160px] pb-14 md:pb-20">
					<HeroSection />
					<StatsCounter stats={[
						{ value: 18, suffix: "+", label: "Projects" },
						{ value: 9, suffix: "+", label: "Clients" },
						{ value: 5, suffix: "", label: "Avg. Rating" }
					]} />
					<div className="mt-8 mb-8 text-center text-gray-700 text-lg font-medium">
						"Welcome to Bluvia — where oceanic design meets modern web technology."
					</div>
					<p className="text-center text-gray-500 max-w-[1200px] mx-auto px-4 mb-4">
						We believe every business deserves a website that feels alive, modern, and uniquely theirs. Our team combines design, animation, and technology to create digital experiences that inspire.
					</p>
				</section>
				<section className="py-16 md:py-24">
					<ServicesSection />
					<ul className="mt-8 mb-8 max-w-[1200px] mx-auto px-4 text-gray-700 text-base leading-relaxed space-y-2">
						<li>• Every service is crafted for performance, beauty, and business growth.</li>
						<li>• We blend glassmorphism, ocean gradients, and smooth UX for a premium feel.</li>
						<li>• Our team delivers fast, SEO-optimized, and interactive solutions.</li>
					</ul>
					<p className="text-center text-gray-500 max-w-[1200px] mx-auto px-4 mb-4">
						From business websites to AI-powered features, Bluvia is your partner for digital transformation. Let us help you stand out in the digital ocean.
					</p>
				</section>
				<section className="py-16 md:py-24">
					<PricingSection />
					<div className="mt-8 mb-8 text-center text-gray-600 text-base font-medium">
						"Transparent pricing. No hidden fees. Choose the plan that fits your ambition."
					</div>
					<p className="text-center text-gray-500 max-w-[1200px] mx-auto px-4 mb-4">
						Whether you’re just starting or scaling up, our plans are designed to give you maximum value and flexibility.
					</p>
				</section>
				<section className="py-16 md:py-24" id="portfolio">
					<PortfolioSection />
					<div className="mt-8 mb-8 text-center text-gray-700 text-base italic">
						See our work samples and how we bring brands to life.
					</div>
					<p className="text-center text-gray-500 max-w-[1200px] mx-auto px-4 mb-4">
						Each project is a story — explore the samples and imagine what we can build for you.
					</p>
				</section>
				<TestimonialsCarousel />
				<section className="pt-16 md:pt-24 pb-0 md:pb-0">
					<ContactSection />
					<div className="mt-8 mb-8 text-center text-gray-600 text-base">
						Ready to make waves? <span className="font-semibold text-gray-800">Contact us today and let's build something beautiful.</span>
					</div>
					<p className="text-center text-gray-500 max-w-[1200px] mx-auto px-4 mb-4">
						Have a project in mind? Let’s talk about your goals and how we can help you achieve them.
					</p>
				</section>
				<ClientLogos />
				<FAQSection />
				<NewsletterSignup />
			</div>
			{showTop && (
				<button
					aria-label="Back to top"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 text-white p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
				>
					↑
				</button>
			)}
		</>
	);
}
