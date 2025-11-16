'use client'
import { useEffect, useState, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "emailjs-com";
import { useRouter, useSearchParams } from "next/navigation";

const serviceId = "service_kv038bt";
const templateId = "template_mnsq05k";
const userId = "ylfphfzXIJRLFZohj";

const websiteTypes = [
  "Gym Website",
  "Hotel Website",
  "Portfolio",
  "Restaurant Website",
  "Saloon Business",
  "SaaS Website",
  "E-commerce",
  "Other"
];

const plans = [
  { tier: "Starter Pack", price: "₹500" },
  { tier: "Business Pack", price: "₹1,000" },
  { tier: "Pro Pack", price: "₹2,000" },
  { tier: "Premium Pack", price: "₹4,000" }
];

const showcaseImages = [
  "/assets/website.png",
  "/assets/saas_website.png",
  "/assets/restaruant.png",
  "/assets/gym_website.png"
];

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fields, setFields] = useState({
    websiteType: "",
    customType: "",
    plan: "Business Pack",
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();

  // Set plan from query param if present
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam && plans.some(p => p.tier === planParam)) {
      setFields(f => ({ ...f, plan: planParam }));
    }
  }, [searchParams]);

  // Scroll to section if hash is present in URL (for /#features etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      // Wait for navigation, then scroll to section on home page
      window.location.href = "/" + hash;
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    // Only allow digits for phone field
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFields({ ...fields, [name]: digits });
    } else {
      setFields({ ...fields, [name]: value });
    }
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Validate website type
    if (!fields.websiteType && !fields.customType.trim()) {
      setError("Please select or enter a website type.");
      return;
    }
    // Validate name
    if (!fields.name.trim() || fields.name.length < 2) {
      setError("Please enter your name.");
      return;
    }
    // Validate email or phone (at least one required)
    const emailFilled = !!fields.email.trim();
    const phoneFilled = !!fields.phone.trim();
    if (!emailFilled && !phoneFilled) {
      setError("Please provide at least an email or a phone number.");
      return;
    }
    // Email validation (if filled)
    if (emailFilled && !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(fields.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    // Phone validation (if filled)
    if (phoneFilled && !/^[6-9]\d{9}$/.test(fields.phone.trim())) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    // Validate message
    if (!fields.message.trim() || fields.message.length < 5) {
      setError("Please enter a message (at least 5 characters).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const form = formRef.current;

      // Remove any existing hidden fields to avoid duplicates
      Array.from(form.querySelectorAll('input[type="hidden"][name="websiteType"],input[type="hidden"][name="customType"]')).forEach(input => input.remove());

      // Always add hidden fields for websiteType and customType
      const websiteTypeInput = document.createElement("input");
      websiteTypeInput.type = "hidden";
      websiteTypeInput.name = "websiteType";
      // Always send the actual answer (customType if filled, else websiteType)
      websiteTypeInput.value = fields.customType.trim()
        ? fields.customType
        : fields.websiteType;
      form.appendChild(websiteTypeInput);

      const customTypeInput = document.createElement("input");
      customTypeInput.type = "hidden";
      customTypeInput.name = "customType";
      customTypeInput.value = fields.customType;
      form.appendChild(customTypeInput);

      await emailjs.sendForm(serviceId, templateId, form, userId);
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send booking. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-10 min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: "120px" }}>
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-transparent opacity-50" />
        <div className="absolute -bottom-24 -right-16 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-25"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(180,194,217,.32) 0%, rgba(180,194,217,0) 70%)" }} />
      </div>
      {/* heading */}
      <div className="w-full max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 text-center mb-3">
          Book Your Website
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6 text-lg md:text-xl">
          Start your digital journey with Bluvia. Fill out the form below to book your website project—fast, modern, and tailored for your business.
        </p>
      </div>
      {/* form card */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-md shadow-black/5 p-6 sm:p-10 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800"
          >
            {/* website type */}
            <div>
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                What type of website do you need?
              </label>
              <select
                name="websiteType"
                value={fields.websiteType}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="" className="bg-white">Select type...</option>
                {websiteTypes.map(type => (
                  <option key={type} value={type} className="bg-white">{type}</option>
                ))}
              </select>
              {fields.websiteType === "Other" && (
                <input
                  name="customType"
                  placeholder="Enter your business type"
                  className="mt-2 w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={fields.customType}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
            {/* plan */}
            <div>
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                Choose a plan
              </label>
              <select
                name="plan"
                value={fields.plan}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {plans.map(p => (
                  <option key={p.tier} value={p.tier} className="bg-white">
                    {p.tier} ({p.price}){p.tier === "Business Pack" ? " - Recommended" : ""}
                  </option>
                ))}
              </select>
            </div>
            {/* name */}
            <div>
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                Your Name
              </label>
              <input
                name="name"
                placeholder="Your name"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                value={fields.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            {/* email */}
            <div>
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                Email
              </label>
              <input
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                type="email"
                value={fields.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {/* phone */}
            <div>
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                Phone
              </label>
              <input
                name="phone"
                placeholder="Phone number"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                type="tel"
                value={fields.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            {/* message */}
            <div className="md:col-span-2">
              <label className="font-semibold text-base text-gray-800 mb-1 block">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Message"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                value={fields.message}
                onChange={handleChange}
                required
              />
            </div>
            {/* hidden fields + error */}
            <input type="hidden" name="websiteType" value={fields.customType.trim() ? fields.customType : fields.websiteType} />
            <input type="hidden" name="customType" value={fields.customType} />
            <input type="hidden" name="time" value={new Date().toLocaleString()} />
            {error && (
              <div className="md:col-span-2 text-red-600 font-semibold text-sm text-center">
                {error}
              </div>
            )}
            {/* CTA */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white mt-2 shadow-lg hover:shadow-black/10 transition overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
                disabled={loading}
              >
                <span className="absolute inset-0 bg-white/20 opacity-20" />
                <span className="relative">{loading ? "Sending..." : "Book Now"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center text-gray-700 font-semibold text-lg">
            <span className="block text-2xl mb-2 text-gray-900">Thank you!</span>
            <span className="block mb-2">Your booking has been received. We'll contact you soon.</span>
            <span className="block text-sm text-gray-500">
              (Powered by EmailJS)
            </span>
          </div>
        )}
      </div>
      {/* lower light content */}
      <div className="flex flex-col items-center w-full mt-24 mb-16 px-4">
        <Image
          src="/assets/logo_round.png"
          alt="Bluvia Logo"
          width={110}
          height={110}
          className="rounded-full mb-8 shadow-md"
          priority
          decoding="async"
        />
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 text-center">Why Choose Bluvia?</h2>
        <p className="text-gray-600 text-center max-w-3xl mb-10 text-xl">
          <b className="text-gray-900">We don't just build websites, we build your digital brand.</b> Our team combines creativity, technology, and business insight to deliver results that matter.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 w-full max-w-4xl">
          <ul className="text-gray-700 text-lg list-disc list-inside space-y-4">
            <li>⚡ <b className="text-gray-900">Lightning-fast</b> and SEO-optimized websites for every device.</li>
            <li>🌊 <b className="text-gray-900">Modern & elegant</b> design language that stands out.</li>
            <li>🤝 <b className="text-gray-900">Personalized support</b> and unlimited revisions on Pro & Premium plans.</li>
            <li>🔒 <b className="text-gray-900">Free hosting</b>, secure setup, and analytics included.</li>
          </ul>
          <ul className="text-gray-700 text-lg list-disc list-inside space-y-4">
            <li>💡 <b className="text-gray-900">Experience with all business types</b>: SaaS, e-commerce, portfolio, restaurant, and more.</li>
            <li>🎨 <b className="text-gray-900">Custom branding</b> and UI/UX for your unique vision.</li>
            <li>🚀 <b className="text-gray-900">Transparent pricing</b> and no hidden fees.</li>
            <li>🧑‍💻 <b className="text-gray-900">Full support</b> from a passionate, creative team.</li>
          </ul>
        </div>
        <div className="flex gap-8 flex-wrap justify-center mb-12">
          {showcaseImages.map((img, idx) => (
            <div key={idx} className="relative w-40 h-28 sm:w-56 sm:h-40 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md">
              <Image
                src={img}
                alt="Website example"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 224px"
              />
            </div>
          ))}
        </div>
        <div className="text-gray-600 text-center max-w-3xl mb-10 text-xl">
          <b className="text-gray-900">Ready to make your mark online?</b> Book your project now and join dozens of happy clients who trust Bluvia for their digital presence.<br />
          <span className="block mt-4 text-base text-gray-500">
            Need help choosing a plan or have questions? <a href="/#contact" className="underline text-blue-600 hover:text-blue-500">Contact us</a> anytime.
          </span>
        </div>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold border border-gray-200 bg-white text-gray-800 hover:bg-[#F8FAFC] text-lg"
          >
            ← Back to Home
          </Link>
          <a
            href="/#features"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold border border-gray-200 bg-white text-gray-800 hover:bg-[#F8FAFC] text-lg"
            onClick={e => {
              e.preventDefault();
              window.location.href = "/#features";
            }}
          >
            Go to Features
          </a>
          <a
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold border border-gray-200 bg-white text-gray-800 hover:bg-[#F8FAFC] text-lg"
            onClick={e => {
              e.preventDefault();
              window.location.href = "/#pricing";
            }}
          >
            Go to Pricing
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold border border-gray-200 bg-white text-gray-800 hover:bg-[#F8FAFC] text-lg"
            onClick={e => {
              e.preventDefault();
              window.location.href = "/#contact";
            }}
          >
            Contact Us
          </a>
        </div>
        {/* bottom feature cards can be converted similarly if needed */}
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Booking form includes required project details ensuring meaningful page content for service evaluation.
      </p>
    </section>
  );
}

// Wrap BookingForm in Suspense for useSearchParams support
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">Loading booking form...</div>}>
      <BookingForm />
    </Suspense>
  );
}
