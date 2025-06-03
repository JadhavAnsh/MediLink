import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-10 px-6 rounded-t-2xl border-t border-emerald-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-emerald-400">Medi-Link</h2>
          <p className="text-sm text-gray-400">
            Your trusted partner in booking appointments and managing healthcare
            with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-emerald-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/features" className="hover:text-emerald-300 transition">
                Features
              </a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-emerald-300 transition">
                Find Doctors
              </a>
            </li>
            <li>
              <a
                href="/appointments"
                className="hover:text-emerald-300 transition"
              >
                Appointments
              </a>
            </li>
            <li>
              <a
                href="/report-analysis"
                className="hover:text-emerald-300 transition"
              >
                Report Analysis
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-emerald-400">
            Contact
          </h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" /> support@medilink.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-400" /> +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-emerald-400">
            Follow Us
          </h3>
          <div className="flex gap-4 text-gray-400">
            <a href="/" className="hover:text-blue-400 transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="/" className="hover:text-pink-400 transition">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="/" className="hover:text-sky-400 transition">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Medi-Link. All rights reserved.
      </div>
    </footer>
  );
};
