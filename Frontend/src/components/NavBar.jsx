import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  DollarSign,
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Repeat,
  Target,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { userData } from "../utils/Data";
import { currencies } from "../types/currency";
import { useCurrency } from "../context/CurrencyContext.jsx";

/**
 * Modern minimal Navbar
 * - Clean, accessible, responsive
 * - Click/outside/escape closes menus
 * - Proper keyboard + ARIA attributes
 * - Small, reusable structure and clearer state
 */

const Navbar = () => {
  const { selectedCurrency, handleCurrencyChange } = useCurrency();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const rootRef = useRef(null);
  const currencyRef = useRef(null);
  const profileRef = useRef(null);

  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: "LayoutDashboard" },
    { name: "Cards", to: "/wallets", icon: "CreditCard" },
    { name: "Transactions", to: "/transactions", icon: "ArrowLeftRight" },
    { name: "Subscriptions", to: "/subscriptions", icon: "Repeat" },
    { name: "Planning Goals", to: "/planning-goals", icon: "Target" },
  ];

  const icons = {
    LayoutDashboard,
    CreditCard,
    ArrowLeftRight,
    Repeat,
    Target,
  };

  const flags = {
    USD: "US",
    EUR: "EU",
    COP: "CO",
    GBP: "GB",
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      // if click is outside the currency menu, close it
      if (
        currencyOpen &&
        currencyRef.current &&
        !currencyRef.current.contains(e.target)
      ) {
        setCurrencyOpen(false);
      }
      // if click is outside the profile menu, close it

      // close mobile menu when clicking outside on small screens
      if (
        mobileOpen &&
        rootRef.current &&
        !rootRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setCurrencyOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [currencyOpen, mobileOpen]);

  const isActive = (to) => location.pathname === to;

  return (
    <header
      ref={rootRef}
      className="w-full bg-[--background-layout] text-white shadow-sm"
    >
      <div className="py-4 space-y-4 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 no-underline"
            >
              <div className="flex h-16 w-16   justify-center items-center rounded-xl bg-gradient-to-br from-indigo-400 to-[--indigo] text-white text-4xl font-semibold">
                <DollarSign className="h-12 w-12"></DollarSign>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-semibold leading-tight">
                  Fincan.io
                </div>
                <div className="text-md text-[11px] text-gray-400">
                  Fintech platform
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop links */}
          <nav className="hidden md:flex md:items-center md:gap-4">
            {navItems.map((item) => {
              const Icon = icons[item.icon];
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2  text-md font-medium transition-all duration-[--duration-standard] hover: focus:outline-none focus:ring-2 focus:ring-[--indigo] ${
                    isActive(item.to)
                      ? "bg-[#262b38] text-[white]"
                      : "text-[--text-subtitle] hover:text-white hover:bg-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" /> {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action group (currency, profile) */}
          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div ref={currencyRef} className="relative">
              <button
                aria-haspopup="menu"
                aria-expanded={currencyOpen}
                onClick={() => setCurrencyOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-md font-medium hover:bg-[#262b38] focus:outline-none focus:ring-2 focus:ring-[--indigo]"
              >
                <span className="min-w-[48px] flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={flags[selectedCurrency.code] || "US"}
                    svg
                    style={{ width: 20, height: 20 }}
                    title={flags[selectedCurrency.code]}
                  />
                  <span className="hidden sm:inline">
                    {selectedCurrency.code}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 text-gray-300" />
              </button>

              {currencyOpen && (
                <ul
                  role="menu"
                  className="absolute right-0 mt-2 w-56 rounded-lg bg-[#0f1720] py-2 shadow-lg ring-1 ring-black ring-opacity-30 z-50"
                >
                  {currencies.map((c) => (
                    <li key={c.code} role="none">
                      <button
                        role="menuitem"
                        onClick={() => {
                          handleCurrencyChange(c);
                          setCurrencyOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 px-4 py-2 text-md text-gray-200 hover:bg-[#111827] hover:text-white"
                      >
                        <span className="flex items-center gap-3">
                          <ReactCountryFlag
                            countryCode={flags[c.code] || "US"}
                            svg
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="truncate">{c.name}</span>
                        </span>
                        <span className="text-xs text-gray-400">{c.code}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <div
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg p-1   focus:outline-none focus:ring-2 focus:ring-[--indigo]"
              >
                <img
                  src={userData.photo}
                  alt={userData.name || "User"}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#262b38] focus:outline-none focus:ring-2 focus:ring-[--indigo]"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg  text-[--indigo] shadow-inner">
            <Sparkles className="h-12 w-12" />
          </div>

          <div>
            <h2 className="text-4xl font-semibold leading-tight text-indigo-300">
              Welcome back, {userData.name.split(" ")[0]}!
            </h2>
            <p className="mt-1 text-xl text-indigo-200">
              Here’s a quick summary of your account — all set to continue.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transform-gpu transition-[max-height,opacity] duration-200 ease-in-out overflow-hidden bg-[#0b1220] ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 pb-4 pt-3">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  isActive(item.to)
                    ? "bg-[#262b38] text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-gray-800 pt-3">
            <div className="flex items-center gap-3 px-1">
              <img
                src={userData.photo}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium">{userData.name}</div>
                <div className="text-xs text-gray-400">{userData.email}</div>
              </div>
            </div>

            <div className="mt-3 space-y-1 px-1">
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-200 hover:bg-[#111827]">
                Profile
              </button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-200 hover:bg-[#111827]">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
