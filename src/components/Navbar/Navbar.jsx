import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 shadow-sm"
      style={{
        backgroundColor: "var(--background-color)",
        fontWeight: "bold",
        fontFamily:
          "Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <nav className="bg-transparent">
        <div className="flex container mx-auto justify-between items-center p-5 text-[var(--primary-color)]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--primary-color)] text-2xl"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Navigation Links */}
          <ul
            className={`flex-col-reverse mt-7 items-center md:flex-row md:flex gap-6 absolute md:static top-16 right-0 bg-[var(--background-color)] md:bg-transparent w-full md:w-auto p-5 md:p-0 transition-all duration-300 ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <li>
              <Link to="/register">
                <div className="bg-[var(--primary-color)] rounded-3xl p-2 mr-0 md:mr-10 flex items-center justify-center w-full md:w-fit hover:scale-105 transition">
                  <span className="w-8 h-8 flex items-center justify-center bg-white text-[var(--primary-color)] rounded-full">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span className="ml-2 text-white">تواصل معنا</span>
                </div>
              </Link>
            </li>

            <li>
              <NavLink
                to="/showIdea"
                className="hover:text-[var(--accent-color)]"
              >
                اعرض فكرتك
              </NavLink>
            </li>
            <li>
              <NavLink to="/works" className="hover:text-[var(--accent-color)]">
                أعمالنا
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="hover:text-[var(--accent-color)]"
              >
                خدماتنا
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-[var(--accent-color)]">
                من نحن
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-[var(--accent-color)]">
                الرئيسية
              </NavLink>
            </li>
          </ul>

          {/* Logo */}
          <Link to="/">
            <img
              className="pt-2"
              src="./src/assets/images/upseeds-logo.png"
              width={160}
              alt="Upseeds Logo"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
