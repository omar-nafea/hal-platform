import React from "react";
import Navbar from "../Navbar/Navbar";
import heroImg from "../../assets/images/img-hero.png";

export default function Hero() {
  return (
    <div>
      <header className="bg-hero  md:h-screen overflow-hidden  flex flex-col justify-center">
        <Navbar />

        <div className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-32 gap-8 lg:gap-0 py-10">
          <div className="flex justify-center lg:justify-start hero-img max-w-[681px] max-h-[424px]">
            <img
              src={heroImg}
              alt="heroImg"
              className="w-[80%] lg:w-full h-auto max-h-[70vh] object-contain transform scale-x-[-1]"
            />
          </div>

          <div className="hero-content w-full lg:w-[480px] text-center lg:text-right">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-header leading-relaxed">
              نُطوّر أعمالك بحلول ذكاء اصطناعي مبتكرة
            </h1>
            <p className="text-subheader mt-4 text-sm md:text-base">
              ساعدك على الابتكار والأتمتة وتوسيع أعمالك من خلال حلول ذكاء
              اصطناعي وتقنيات متقدمة مصممة خصيصًا لنجاحك في سوق سريع التغير
            </p>
            <div className="flex justify-center items-center lg:justify-end mt-6">
              <div className="bg-contact rounded-3xl p-2 flex items-center max-w-[180px] w-full cursor-pointer hover:scale-105 transition justify-around">
                <span className="w-8 h-8 flex items-center justify-center bg-[var(--bg-main)] rounded-full main-text">
                  <i className="fa-solid fa-arrow-left"></i>
                </span>
                <span className="ml-2 text-contact">أبدأ رحلتك الان </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
