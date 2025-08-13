import { useState } from "react";
import { useEffect } from "react";

import ReactCountryFlag from "react-country-flag";

import {
  Search,
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { userData } from "../utils/Data";
import { currencies } from "../types/currency";

import { useCurrency } from "../context/CurrencyContext.jsx"; // 👈 Importa el hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCurrencyOpen, setCurrencyOpen] = useState(false);

  const { selectedCurrency, handleCurrencyChange } = useCurrency(); // 👈 Usa el contexto

  const location = useLocation();

  const navItems = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Cards", to: "/wallets" },
    { name: "Transactions", to: "/transactions" },
    { name: "Subscriptions", to: "/subscriptions" },
    { name: "planning-goals", to: "/planning-goals" },
  ];

  const flags = {
    USD: "US",
    EUR: "EU",
    COP: "CO",
    GBP: "GB",
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleCurrencyClick = () => {
    setCurrencyOpen(!isCurrencyOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      const target = e.target;
      if (
        !target.closest(".profile-menu") &&
        !target.closest(".currency-menu")
      ) {
        setIsProfileOpen(false);
        setCurrencyOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="top-0 z-50 w-full bg-[--background-layout] text-white">
      {/* Main navbar container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand section */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl text-indigo-500">⟨</div>
            <div>
              <div className="text-lg font-semibold">Fincan.io</div>
              <div className="text-xs text-gray-400">Fintech platform</div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-lg px-4 py-2 text-sm ${
                    location.pathname === item.to
                      ? "bg-[#262b38] text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search, notifications, and profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything here"
                  className="w-64 rounded-lg bg-[#262b38] py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="rounded-lg p-2 hover:bg-[#262b38]">
                <Bell className="h-5 w-5" />
              </button>

              <div className="currency-menu relative">
                <button
                  onClick={handleCurrencyClick}
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-[#262b38]"
                >
                  <span className="flex gap-2 items-center justify-center">
                    {selectedCurrency.code}
                    <ReactCountryFlag
                      countryCode={flags[selectedCurrency.code]}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title={flags[selectedCurrency.code]}
                    />
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isCurrencyOpen && (
                  <ul className="absolute right-0 mt-2 w-48 rounded-lg bg-[#262b38] py-2 shadow-xl ring-1 ring-black ring-opacity-5 p-2">
                    {currencies.map((currency) => (
                      <li key={currency.code}>
                        <button
                          onClick={() => handleCurrencyChange(currency)}
                          className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1f2e] hover:text-white rounded-lg transition-all duration-300"
                        >
                          {currency.name}{" "}
                          <ReactCountryFlag
                            countryCode={flags[currency.code]}
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title={flags[currency.code]}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="profile-menu relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={userData.photo}
                    alt="Profile"
                    className="h-8 w-8 rounded-full ring-2 ring-transparent transition-all hover:ring-indigo-500"
                  />
                </button>

                {/* Dropdown menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#262b38] py-2 shadow-xl ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1f2e] hover:text-white"
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1f2e] hover:text-white"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <div className="my-1 border-t border-gray-700"></div>
                    <button
                      onClick={() => console.log("Sign out")}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1f2e] hover:text-white"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-[#262b38] focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="space-y-1 bg-[#1a1f2e] px-2 pb-3 pt-2 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block rounded-lg px-3 py-2 text-base font-medium ${
                item.name === "Dashboard"
                  ? "bg-[#262b38] text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything here"
                  className="w-full rounded-lg bg-[#262b38] py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Welcome back, Ali Husni!</h1>
      </div>
    </nav>
  );
};

export default Navbar;
