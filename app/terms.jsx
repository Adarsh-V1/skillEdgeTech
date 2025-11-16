'use client'
export default function Terms() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md shadow-black/5 p-8 text-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none" />
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Terms of Service</h1>
        <ul className="mb-4 text-gray-700 list-disc list-inside">
          <li>By using our website or booking a service, you agree to our terms.</li>
          <li>All content and designs are property of Bluvia unless otherwise stated.</li>
          <li>We reserve the right to refuse or cancel projects at our discretion.</li>
          <li>Refunds are handled on a case-by-case basis.</li>
          <li>Contact us for any questions or clarifications.</li>
        </ul>
        <p className="text-gray-700">Contact: <span className="text-blue-600">hello@bluvia.tech</span></p>
      </div>
    </div>
  );
}
