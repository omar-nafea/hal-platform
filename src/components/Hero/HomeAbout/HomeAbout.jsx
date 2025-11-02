import React from "react";
import aboutImg from "../../../assets/images/about-img.png";
import dots from "../../../assets/images/bottom-dots.png";
import { motion } from "framer-motion";

export default function HomeAbout() {
  return (
    <div className="py-20 relative bg-white overflow-hidden">
      {/* Dots Background */}
      <img
        src={dots}
        alt="dots"
        className="absolute w-full lg:w-[45%] bottom-0 left-0 z-0 opacity-30"
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-10 p-5 items-center">
          {/* Text Section */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-2 flex flex-col items-center lg:items-end text-[#491C86]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block text-lg font-semibold mb-4 text-[#6B2BAE]">
              &lt; من نحن &gt;
            </span>

            <h2 className="font-bold text-3xl lg:text-4xl mb-6 leading-snug text-center lg:text-right">
              التكنولوجيا في خدمتك… لنقل عملك إلى مستوى جديد
            </h2>

            <p className="mb-8 text-gray-700 leading-relaxed text-center lg:text-right max-w-lg">
              نحن شركة تقنية متخصصة في تطوير حلول ذكاء اصطناعي وتقنيات مبتكرة
              تساعد الشركات على الأتمتة والنمو في عالم رقمي سريع التغير. نعمل مع
              فريق خبراء لتقديم حلول مخصصة تضمن لك التميز والمنافسة.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-[#491C86] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#6B2BAE] transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left text-[#00B3A4] text-lg ml-2"></i>
              <span className="text-lg font-medium">اعرف المزيد عنا</span>
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative col-span-12 lg:col-span-5 flex justify-center z-10"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#6B2BAE]/20 to-[#00B3A4]/20 rounded-3xl blur-lg"></div>
              <img
                src={aboutImg}
                alt="aboutImg"
                className="relative z-10 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
