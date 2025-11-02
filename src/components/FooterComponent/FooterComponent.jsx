import React from "react";

export default function FooterComponent() {
  return (
    <footer className="bg-[#491C86] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 text-right font-[Cairo]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 border-b border-[#EBDDF8]/20 pb-12">
          {/* Info Columns */}
          <div className="grid gap-10 sm:grid-cols-3 flex-1">
            {/* Contact */}
            <div className="flex flex-col items-end">
              <h3 className="mb-4 font-semibold text-lg text-[#EBDDF8]">
                تواصل معنا
              </h3>
              <ul className="space-y-2 text-sm text-gray-100">
                <li>hello@upseeds.com</li>
                <li>(02) 111-509-086</li>
                <li>
                  شركة، برج ريجال، الخليج التجاري، دبي، الإمارات العربية المتحدة
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col items-end">
              <h3 className="mb-4 font-semibold text-lg text-[#EBDDF8]">
                خدماتنا
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "الذكاء الاصطناعى",
                  "تطوير البرمجيات",
                  "معالجة اللغات",
                  "التحويل الرقمى",
                ].map((service, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-[#EBDDF8] transition-colors duration-200"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-col items-end">
              <h3 className="mb-4 font-semibold text-lg text-[#EBDDF8]">
                روابط مهمة
              </h3>
              <ul className="space-y-2 text-sm">
                {["الرئيسية", "اعمالنا", "تواصل معنا"].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-[#EBDDF8] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo & About */}
          <div className="w-full md:w-[32%] text-right">
            <img
              src="./src/assets/images/upseeds-logo.png"
              alt="Upseeds Logo"
              className="w-[180px] filter brightness-0 invert mb-4 ml-auto drop-shadow-lg"
            />

            <p className="text-sm leading-7 text-gray-100">
              نحن شركة تقنية متخصصة في تطوير حلول ذكاء اصطناعي وتقنيات مبتكرة
              تساعد الشركات على الأتمتة والنمو في عالم رقمي سريع التغير. نعمل
              مع فريق خبراء لتقديم حلول مخصصة تضمن لك التميز والمنافسة.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="w-full mt-10 flex justify-end gap-4">
          {[
            { icon: "fa-facebook-f", link: "#" },
            { icon: "fa-twitter", link: "#" },
            { icon: "fa-linkedin-in", link: "#" },
            { icon: "fa-instagram", link: "#" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              className="w-10 h-10 rounded-full bg-white text-[#491C86] flex items-center justify-center hover:bg-[#EBDDF8] hover:scale-110 transition duration-200 shadow-md"
            >
              <i className={`fa-brands ${social.icon}`}></i>
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="text-center md:text-right text-xs text-gray-200 mt-8">
          © 2025 جميع الحقوق محفوظة. تم التصميم والتطوير بواسطة{" "}
          <span className="text-[#EBDDF8] font-medium">
            فريق أبسيدز التقني
          </span>
          .
        </div>
      </div>
    </footer>
  );
}
