'use client'
import { useState, useRef } from "react";
import { siteContent } from "../content";
import { useSoundEffect } from "../hooks/useSoundEffect";
import emailjs from "emailjs-com";
import Tooltip from "./Tooltip";

const serviceId = "service_kv038bt";
const templateId = "template_mnsq05k";
const userId = "ylfphfzXIJRLFZohj";

const plans = [
	{
		tier: "Starter Pack",
		price: "₹1,000",
		features: [
			"Up to 2 pages",
			"Responsive design",
			"Basic SEO",
			"1 revision",
			"4–5 days delivery",
			"Free hosting",
		],
	},
	{
		tier: "Business Pack",
		price: "₹2,000",
		features: [
			"Up to 5 pages",
			"Advanced on-page SEO",
			"Smooth animations",
			"Improved UI/UX",
			"3 revisions",
			"5–7 days delivery",
			"Free hosting",
		],
		recommended: true,
	},
	{
		tier: "Pro Pack",
		price: "₹3,000",
		features: [
			"Up to 10 pages",
			"Premium SEO",
			"Advanced effects/3D",
			"Forms & integrations",
			"Unlimited revisions",
			"Priority support",
			"7–10 days delivery",
			"Free hosting",
		],
	},
	{
		tier: "Premium Pack",
		price: "₹5,000",
		features: [
			"Everything in Pro",
			"Custom branding",
			"Analytics setup",
			"Ongoing support",
			"10–14 days delivery",
			"Free hosting",
		],
	},
];

export default function PricingSection() {
	const { playClick } = useSoundEffect();
	const [showModal, setShowModal] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	function handleChoose(plan) {
		setSelectedPlan(plan);
		setShowModal(true);
		playClick();
	}

	function closeModal() {
		setShowModal(false);
		setSelectedPlan(null);
	}

	return (
		<section
			id="pricing"
			className="relative px-2 py-16 md:py-24"
			style={{
				contentVisibility: "auto",
				containIntrinsicSize: "900px",
			}}
		>
			{/* colorful background accents */}
			<div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
				<div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-60" />
				<div
					className="absolute inset-0 blur-2xl opacity-55"
					style={{
						background:
							"radial-gradient(32% 28% at 20% 22%, rgba(125,211,252,0.32) 0%, rgba(125,211,252,0) 60%)," +
							"radial-gradient(28% 24% at 78% 30%, rgba(167,139,250,0.28) 0%, rgba(167,139,250,0) 62%)," +
							"radial-gradient(26% 22% at 30% 80%, rgba(96,165,250,0.26) 0%, rgba(96,165,250,0) 60%)",
						mixBlendMode: "screen",
						filter: "saturate(1.1) blur(30px)",
					}}
				/>
			</div>
			<div className="max-w-[1200px] mx-auto px-4">
				<h2 className="fx-text-expand text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-gray-900">
					Website Pricing & Packages
				</h2>
				<div className="mb-6 text-center text-gray-600 text-base font-medium">
					<span className="font-semibold text-gray-800">Note:</span> Custom
					domain names (like{" "}
					<span className="font-mono">.com</span> or{" "}
					<span className="font-mono">.in</span>) cost extra, but we provide a
					free domain if you don't want a custom one.
				</div>
				<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
					{plans.map((p, idx) => (
						<div
							key={idx}
							className="group pressable relative rounded-xl border border-gray-200 bg-white shadow-md shadow-black/5 p-6 flex flex-col items-center justify-between text-center text-gray-800 transition-transform duration-150 hover:shadow-lg hover:shadow-black/10"
						>
							<div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-xl pointer-events-none" />
							{p.recommended && (
								<div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
									Recommended
								</div>
							)}
							<div className="flex flex-col items-center">
								<h3 className="fx-text-expand font-semibold text-lg sm:text-xl md:text-2xl mb-1 md:mb-2 text-gray-900">
									{p.tier}
								</h3>
								<p className="fx-text-expand mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-500">
									{p.price}
								</p>
								<ul className="mt-4 space-y-1 sm:space-y-2 text-sm sm:text-base md:text-lg text-gray-600 text-center">
									{p.features.map((f, i2) => (
										<li key={i2}>• {f}</li>
									))}
								</ul>
							</div>
							<div className="mt-6 md:mt-8">
								<button
									type="button"
									className="pressable relative inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-white shadow-lg hover:shadow-black/10 transition overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
									onClick={() => handleChoose(p)}
								>
									<span className="absolute inset-0 bg-white/20 opacity-20" />
									<span className="relative">Choose</span>
								</button>
							</div>
						</div>
					))}
				</div>
				{showModal && <PlanModal plan={selectedPlan} onClose={closeModal} />}
			</div>
		</section>
	);
}

function PlanModal({ plan, onClose }) {
	const [fields, setFields] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
		plan: plan?.tier || "",
	});
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const formRef = useRef();

	function handleChange(e) {
		setFields({ ...fields, [e.target.name]: e.target.value });
		setError("");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!fields.email.trim() && !fields.phone.trim()) {
			setError("Please provide at least an email or a phone number.");
			return;
		}
		setLoading(true);
		setError("");
		try {
			const form = formRef.current;
			const now = new Date();
			const timeStr = now.toLocaleString();
			const formData = new FormData(form);
			formData.set("time", timeStr);
			await emailjs.sendForm(serviceId, templateId, form, userId);
			setSubmitted(true);
		} catch (err) {
			setError("Failed to send message. Please try again later.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl p-6 sm:p-10 max-w-lg w-full text-gray-800">
				<div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-60 rounded-2xl pointer-events-none" />
				<button
					onClick={onClose}
					className="pressable absolute top-3 right-3 text-gray-500 text-2xl font-bold hover:text-gray-800"
					aria-label="Close"
				>
					×
				</button>
				<h3 className="fx-text-expand text-xl font-semibold mb-2 text-gray-900 text-center">
					Get Started with {plan?.tier}
				</h3>
				<div className="fx-text-expand text-center text-gray-600 mb-4">
					{plan?.price}
				</div>
				{!submitted ? (
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
					>
						<input type="hidden" name="plan" value={plan?.tier} />
						<input
							type="hidden"
							name="time"
							value={new Date().toLocaleString()}
						/>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="name"
								className="font-semibold text-gray-800"
							>
								Your Name
							</label>
							<input
								id="name"
								name="name"
								placeholder="Your name"
								className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
								value={fields.name}
								onChange={handleChange}
								required
								autoComplete="name"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="email"
								className="font-semibold text-gray-800"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								placeholder="Email"
								type="email"
								className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
								value={fields.email}
								onChange={handleChange}
								autoComplete="email"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="phone"
								className="font-semibold text-gray-800"
							>
								Phone
							</label>
							<input
								id="phone"
								name="phone"
								placeholder="Phone number"
								type="tel"
								className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
								value={fields.phone}
								onChange={handleChange}
								autoComplete="tel"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="message"
								className="font-semibold text-gray-800"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								placeholder="Message"
								rows={3}
								className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
								value={fields.message}
								onChange={handleChange}
								required
							/>
						</div>
						{error && (
							<div className="text-red-600 font-semibold text-sm text-center">
								{error}
							</div>
						)}
						<button
							type="submit"
							disabled={loading}
							className="pressable relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-lg hover:shadow-black/10 transition overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
						>
							<span className="absolute inset-0 bg-white/20 opacity-20" />
							<span className="relative">
								{loading ? "Sending..." : "Send Request"}
							</span>
						</button>
					</form>
				) : (
					<div className="p-6 text-center text-gray-700 font-semibold">
						<span className="block text-2xl mb-2 text-gray-900">
							Thank you!
						</span>
						<span className="block mb-2">
							Your request for the{" "}
							<b className="text-gray-900">{plan?.tier}</b> has been received.
						</span>
						<span className="block text-sm text-gray-500">
							(Powered by EmailJS)
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
