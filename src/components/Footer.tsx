import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  HelpCircle,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#262b38] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <div className="text-2xl text-indigo-500">⟨</div>
              <div>
                <div className="text-lg font-semibold">Fincan.io</div>
                <div className="text-xs text-gray-400">Fintech platform</div>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-400">
              Empowering your financial journey with smart tools and insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-500"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-500"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-500"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-indigo-500"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <CreditCard className="h-4 w-4" />
                  Cards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Shield className="h-4 w-4" />
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <HelpCircle className="h-4 w-4" />
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@fincan.io"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  support@fincan.io
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for updates and financial tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} Fincan.io. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
