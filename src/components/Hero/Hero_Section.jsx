import React, { useState, useLayoutEffect } from 'react';

// --- Reusable Hook to get window size ---
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

// --- Reusable SVG & UI Components ---
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);



const ActionButton = ({ text, className }) => (
  <a href="#" className={`flex hover:text-white text-black items-center justify-center gap-4 px-4 py-4 border-2 bg-white hover:border-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-transparent hover:scale-101 ${className}`}>
    <span className="mr-2 text-xl">{text}</span>
    <div className="bg-[#013366] text-white p-2 hover:scale-102 rounded-full p-1">
      <ArrowIcon />
    </div>
  </a>
);

// --- Desktop-Specific Hero Component ---
const DesktopHero = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
     
   

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center w-full">
        <div className="xl:container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-8">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-8 font-extrabold lg:leading-relaxed">
              نُطوِّر أعمالك بحلول ذكاء
              <br />
              اصطناعي مبتكرة
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-2xl leading-4 text-gray-200">
              ساعدك على الابتكار والأتمتة وتوسيع أعمالك من خلال حلول ذكاء اصطناعي وتقنيات متقدمة مصممة خصيصًا لنجاحك في سوق سريع التغير.
            </p>
            <div className="mt-10">
              <ActionButton text="ابدء رحلتك الان!" />
            </div>
          </div>
          <div className="xl:absolute left-0 top-1/4">
            <img
              src={'./src/assets/images/img-hero.png'}
              alt="AI Robotic Hand"
              className="w-full Robotic max-w-2xl h-auto transform  scale-y-100 -scale-x-100"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Mobile/Tablet-Specific Hero Component ---
const MobileHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <header className="relative z-20 w-full py-6 px-4 sm:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <svg width="60" height="100" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.3378 33.6144C22.3378 37.5136 22.3378 41.3351 22.3378 45.2966C22.2149 45.0942 22.143 45.0072 22.1051 44.9088C21.0306 42.1694 19.1728 40.1376 16.5582 38.8114C16.0777 38.5673 15.8998 38.31 15.9017 37.7633C15.9226 31.0359 15.915 24.3084 15.9169 17.581C15.9169 17.3956 15.9169 17.2102 15.9169 16.9586C14.9255 16.9586 13.9664 16.9586 12.9883 16.9586C12.9883 15.9143 12.9883 14.9362 12.9883 13.9013C13.9418 13.9013 14.8991 13.9013 15.8866 13.9013C15.8866 12.8854 15.8866 11.9281 15.8866 10.9179C14.9236 10.9179 13.9796 10.9179 12.9996 10.9179C12.9996 9.86223 12.9996 8.85955 12.9996 7.81146C13.9475 7.81146 14.8934 7.81146 15.8885 7.81146C15.8998 7.60903 15.9169 7.44633 15.9169 7.28174C15.9188 6.12582 15.9055 4.97179 15.932 3.81587C15.9358 3.62668 16.0758 3.35615 16.2347 3.26723C18.1474 2.19644 20.0752 1.15025 21.9992 0.10216C22.0749 0.0605395 22.1676 0.0454045 22.3113 0C22.3113 2.60887 22.3113 5.17233 22.3113 7.78119C26.8821 7.78119 31.4017 7.78119 35.9573 7.78119C35.9573 8.82928 35.9573 9.83196 35.9573 10.8933C31.4225 10.8933 26.9066 10.8933 22.3605 10.8933C22.3605 11.9092 22.3605 12.8684 22.3605 13.8578C22.7786 13.8578 23.1892 13.8578 23.6337 13.8578C23.6337 13.0973 23.6337 12.3538 23.6337 11.5725C24.8275 11.5725 25.9891 11.5725 27.2075 11.5725C27.2075 12.3122 27.2075 13.067 27.2075 13.854C27.5007 13.854 27.7391 13.854 28.0153 13.854C28.0153 13.0973 28.0153 12.3519 28.0153 11.5706C29.2147 11.5706 30.3763 11.5706 31.589 11.5706C31.589 12.3103 31.589 13.067 31.589 13.854C31.8444 13.854 32.0506 13.854 32.3003 13.854C32.3003 13.0935 32.3003 12.35 32.3003 11.5706C33.5357 11.5706 34.7276 11.5706 35.9554 11.5706C35.9554 13.3338 35.9554 15.1046 35.9554 16.9283C31.432 16.9283 26.9142 16.9283 22.3624 16.9283C22.3624 20.3772 22.3624 23.773 22.3624 27.203C25.3951 27.203 28.4296 27.203 31.4906 27.203C31.4906 26.7111 31.4906 26.2343 31.4906 25.6989C28.895 25.6989 26.2994 25.6989 23.6773 25.6989C23.664 25.5079 23.6451 25.3735 23.6451 25.2373C23.6432 23.6614 23.6621 22.0836 23.6337 20.5077C23.6262 20.0536 23.7851 19.9647 24.1994 19.9666C27.2112 19.9818 30.225 19.9723 33.2368 19.9761C34.8941 19.978 35.9875 21.0677 35.9894 22.7249C35.9932 26.1738 35.9819 29.6245 36.0008 33.0734C36.0027 33.5123 35.8684 33.622 35.4465 33.622C31.2939 33.6088 27.1431 33.6144 22.9905 33.6144C22.7881 33.6144 22.5875 33.6144 22.3378 33.6144Z" fill="white" />
              <path d="M11.3353 59.9976C5.50082 60.0884 0.400391 55.2547 0.400391 49.1024C0.400391 43.0957 5.24164 38.0104 11.6285 38.1656C17.516 38.3075 22.2816 42.9387 22.3005 49.091C22.3194 55.3474 17.183 60.0846 11.3353 59.9976ZM11.3448 45.8938C9.60236 45.8049 8.06996 47.2559 8.11915 49.1251C8.17212 51.068 9.49642 52.3166 11.3467 52.3337C13.1742 52.3507 14.5439 50.9885 14.5798 49.1213C14.6158 47.237 13.0115 45.7765 11.3448 45.8938Z" fill="white" />
              <path d="M11.344 45.8935C13.0127 45.7743 14.6151 47.2367 14.5791 49.1191C14.5432 50.9864 13.1735 52.3485 11.3459 52.3315C9.4957 52.3145 8.1714 51.0658 8.11843 49.1229C8.06735 47.2575 9.59975 45.8046 11.344 45.8935ZM8.74463 49.0945C8.74463 50.5929 9.87975 51.7337 11.3611 51.728C12.7819 51.7223 13.9434 50.555 13.9888 49.1759C14.0343 47.8156 12.9767 46.4705 11.3459 46.4346C9.8911 46.4024 8.74463 47.6075 8.74463 49.0945Z" fill="black" />
              <path d="M8.74609 49.096C8.74609 47.609 9.89256 46.4039 11.3474 46.4342C12.9801 46.4701 14.0357 47.8171 13.9903 49.1754C13.9449 50.5546 12.7833 51.7219 11.3625 51.7276C9.88121 51.737 8.74609 50.5943 8.74609 49.096Z" fill="#022345" />
            </svg>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
            <NavLink>الرئيسية</NavLink>
            <NavLink>من نحن</NavLink>
            <NavLink>خدماتنا</NavLink>
            <NavLink>أعمالنا</NavLink>
            <NavLink>اعرض مخبرك</NavLink>
            <div className="mt-4">
              <ActionButton text="تواصل معنا" />
            </div>
          </nav>
        )}
      </header>
      <main className="relative z-10 flex-grow flex items-center w-full">
        <div className="container mx-auto grid grid-cols-1 items-center px-4 sm:px-8 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-normal">
              نُطوِّر أعمالك بحلول ذكاء
              <br />
              اصطناعي مبتكرة
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-200 leading-relaxed">
              ساعدك على الابتكار والأتمتة وتوسيع أعمالك من خلال حلول ذكاء اصطناعي وتقنيات متقدمة مصممة خصيصًا لنجاحك في سوق سريع التغير.
            </p>
            <div className="mt-10">
              <ActionButton text="ابدء رحلتك الان!" />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <img
              src={'./src/assets/images/img-hero.png'}
              alt="AI Robotic Hand"
              className="w-full max-w-sm h-auto transform -scale-x-100"
            />
          </div>
        </div>
      </main>
    </div>
  );
};


// --- Main Hero Component (Conditional Renderer) ---
const Hero = () => {
  const [width] = useWindowSize();
  const isDesktop = width >= 1024; // Tailwind's 'lg' breakpoint

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat text-white flex flex-col overflow-x-hidden"
      style={{ backgroundImage: `url(./src/assets/images/bghero.jpg)`, fontStyle: "bold", fontFamily: "Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      {isDesktop ? <DesktopHero /> : <MobileHero />}
    </div>
  );
};

export default Hero;

