"use client";
import { useState, useRef } from "react";
import { siteContent } from "../content";
import emailjs from "emailjs-com";
import Tooltip from "./Tooltip";

const serviceId = "service_kv038bt";
const templateId = "template_mnsq05k";
const userId = "ylfphfzXIJRLFZohj";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const formRef = useRef();

  function handleChange(e) {
    const { name, value } = e.target;
    // Only allow digits for phone field
    if (name === "phone") {
      // Allow only numbers, max 10 digits
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFields({ ...fields, [name]: digits });
    } else {
      setFields({ ...fields, [name]: value });
    }
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
      // Add a time field for the template
      const form = formRef.current;
      const now = new Date();
      const timeStr = now.toLocaleString();
      // Create a FormData clone to append time
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
    <section
      id="contact"
      className="relative px-2 py-16"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
      {/* unique background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 fx-layer">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-white/10 opacity-40" />
      </div>
      <div className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="fx-text-expand text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10 text-center text-gray-900">
            Contact Bluvia – Start Your Web Project
          </h2>
          <div className="mb-8 text-base sm:text-lg text-center text-gray-600">
            <span className="block mb-2">
              Reach us at{" "}
              <a
                className="underline font-semibold text-blue-600 hover:text-blue-500"
                href={`mailto:${siteContent.contact.email}`}
              >
                {siteContent.contact.email}
              </a>{" "}
              or WhatsApp:{" "}
              <span className="font-semibold text-blue-600">
                {siteContent.contact.phone}
              </span>
            </span>
            <span className="block text-sm text-gray-500">
              Please provide <span className="font-semibold text-gray-700">at least</span> your email{" "}
              <span className="font-semibold text-gray-700">or</span> phone number.
            </span>
          </div>
          {!submitted ? (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative grid gap-6 grid-cols-1 sm:grid-cols-2 p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md shadow-black/5 bg-white text-gray-800 max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
              <Tooltip text="Enter your name">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="name" className="font-semibold text-gray-800">
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
              </Tooltip>
              <Tooltip text="Enter your email address">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-semibold text-gray-800">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    Optional if phone is filled.
                  </span>
                </div>
              </Tooltip>
              <Tooltip text="Enter your phone number">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-semibold text-gray-800">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    type="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    Optional if email is filled.
                  </span>
                </div>
              </Tooltip>
              <Tooltip text="Write your message">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="font-semibold text-gray-800">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    className="p-3 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Tooltip>
              {error && (
                <div className="sm:col-span-2 text-red-600 font-semibold text-sm text-center">
                  {error}
                </div>
              )}
              <Tooltip text="Send your message">
                <button
                  type="submit"
                  className="pressable relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold sm:col-span-2 text-white shadow-lg hover:shadow-black/10 transition overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
                  disabled={loading}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-20" />
                  <span className="relative">{loading ? "Sending..." : "Send message"}</span>
                </button>
              </Tooltip>
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
            </form>
          ) : (
            <div className="relative p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md shadow-black/5 bg-white text-center text-gray-800 max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
              <span className="block text-2xl mb-2 text-gray-900">Thank you!</span>
              <span className="block mb-2 text-gray-700">Your message has been received.</span>
              <span className="block text-sm text-gray-500">
                (Powered by EmailJS)
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
