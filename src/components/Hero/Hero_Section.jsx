import React, { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

// --- Reusable Hook to get window size ---
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

// --- Reusable SVG & UI Components ---
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const ActionButton = ({ text, className }) => (
  <motion.a
    href="#"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className={`flex hover:text-[#491C86] text-white items-center justify-center gap-4 px-8 py-4 border-2 border-[#491C86] bg-[#491C86] rounded-full text-lg font-semibold transition-all duration-300 hover:bg-transparent hover:scale-105 ${className}`}
  >
    <span className="mr-2 text-xl">{text}</span>
    <motion.div
      whileHover={{ scale: 1.2, rotate: -10 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-[#00B3A4] text-white p-2 rounded-full"
    >
      <ArrowIcon />
    </motion.div>
  </motion.a>
);

// --- Desktop Hero Section ---
const DesktopHero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white text-[#491C86] overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-[#491C86]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-[#00B3A4]/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-right">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start max-w-xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-snug">
            نُطوِّر أعمالك بحلول ذكاء
            <br />
            <span className="text-[#00B3A4]">اصطناعي مبتكرة</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-700">
            نساعدك على الابتكار والأتمتة وتوسيع أعمالك من خلال حلول ذكاء
            اصطناعي وتقنيات متقدمة مصممة خصيصًا لنجاحك في سوق سريع التغير.
          </p>
          <div className="mt-10">
            <ActionButton text="ابدأ رحلتك الآن!" />
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <img
            src="./src/assets/images/img-hero.png"
            alt="AI Hand"
            className="w-full max-w-md h-auto transform -scale-x-100 drop-shadow-2xl"
          />
        </motion.div>
      </main>
    </div>
  );
};

// --- Mobile Hero Section ---
const MobileHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white text-[#491C86]">
      <header className="relative z-20 w-full py-6 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-[#491C86] font-extrabold text-3xl">Upseeds</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#491C86] focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-[#491C86]/10 backdrop-blur-sm rounded-lg p-4 text-[#491C86]"
          >
            <a href="#" className="block py-2 hover:text-[#00B3A4]">
              الرئيسية
            </a>
            <a href="#" className="block py-2 hover:text-[#00B3A4]">
              من نحن
            </a>
            <a href="#" className="block py-2 hover:text-[#00B3A4]">
              خدماتنا
            </a>
            <a href="#" className="block py-2 hover:text-[#00B3A4]">
              أعمالنا
            </a>
            <div className="mt-4">
              <ActionButton text="تواصل معنا" />
            </div>
          </motion.nav>
        )}
      </header>

      {/* Mobile Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold leading-normal"
        >
          نُطوِّر أعمالك بحلول ذكاء
          <br />
          <span className="text-[#00B3A4]">اصطناعي مبتكرة</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl"
        >
          نساعدك على الابتكار والأتمتة وتوسيع أعمالك من خلال حلول ذكاء
          اصطناعي وتقنيات متقدمة مصممة خصيصًا لنجاحك في سوق سريع التغير.
        </motion.p>
        <div className="mt-10">
          <ActionButton text="ابدأ رحلتك الآن!" />
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          src="./src/assets/images/img-hero.png"
          alt="AI Hand"
          className="w-full max-w-xs mt-12 transform -scale-x-100"
        />
      </main>
    </div>
  );
};

// --- Main Hero Component (Responsive Switch) ---
const Hero = () => {
  const [width] = useWindowSize();
  const isDesktop = width >= 1024;

  return (
    <div
      className="relative bg-white text-[#491C86] overflow-hidden"
      style={{
        fontFamily:
          "Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
      dir="rtl"
    >
      {isDesktop ? <DesktopHero /> : <MobileHero />}
    </div>
  );
};

export default Hero;
