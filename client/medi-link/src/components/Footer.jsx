import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-emerald-500 dark:bg-[#121212] dark:text-gray-300 dark:border-emerald-600 py-12 px-6 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-500 mb-3">Medi-Link</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Your trusted partner in booking appointments and managing healthcare
            with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-500 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Features", href: "/features" },
              { name: "Find Doctors", href: "/doctors" },
              { name: "Appointments", href: "/appointments" },
              { name: "Report Analysis", href: "/report-analysis" },
            ].map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-500 mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span className="text-muted-foreground dark:text-gray-400">support@medilink.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="text-muted-foreground dark:text-gray-400">+91 98765 43210</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-500 mb-4">Follow Us</h3>
          <div className="flex gap-4 items-center">
            <a href="/" aria-label="Facebook" className="hover:text-blue-500 transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="/" aria-label="Instagram" className="hover:text-pink-500 transition">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="/" aria-label="Twitter" className="hover:text-sky-400 transition">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border dark:border-gray-700 mt-10 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Medi-Link. All rights reserved.
      </div>
    </footer>
  );
};
