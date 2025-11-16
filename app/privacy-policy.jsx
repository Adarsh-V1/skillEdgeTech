'use client'
export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md shadow-black/5 p-8 text-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          We respect your privacy. We do not sell or share your data. We only use your information to contact you about your project or booking.
        </p>
        <ul className="mb-4 text-gray-700 list-disc list-inside">
          <li>We collect your name, email, and phone only for communication.</li>
          <li>We use EmailJS to send form submissions securely.</li>
          <li>We use analytics to improve our site, but do not track personal data.</li>
          <li>You can contact us anytime to request deletion of your data.</li>
        </ul>
        <p className="text-gray-700">
          Contact: <span className="text-blue-600">hello@bluvia.tech</span>
        </p>
      </div>
    </div>
  );
}
