import React from "react";
import aboutImg from "../../../assets/images/about-img.png";
import dots from "../../../assets/images/works dots.png";

export default function WorksSection() {
  return (
    <section className="bg-white relative overflow-hidden py-20 animate-fadeIn">
      {/* Decorative Dots */}
      <img
        src={dots}
        alt="dots"
        className="absolute w-full lg:w-[45%] top-0 left-0 opacity-30 z-0"
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-5 p-5">
          {/* Text Content */}
          <div className="content col-span-12 lg:col-span-5 lg:col-start-3">
            <div className="flex flex-col items-center justify-center lg:items-end text-right">
              <span className="block text-lg font-semibold mb-4 text-[#7E22CE]">
                &lt; أعمالنا &gt;
              </span>

              <div className="mainTitle text-center lg:text-end">
                <h2 className="font-bold text-3xl lg:text-4xl mb-8 leading-snug text-[#7E22CE]">
                  أعمالنا تروي قصة نجاح عملائنا
                </h2>
                <p className="mb-8 text-[#7E22CE] leading-relaxed text-lg">
                  استكشف مجموعة من المشاريع الناجحة التي نفذناها، حيث دمجنا أحدث
                  تقنيات الذكاء الاصطناعي والتحول الرقمي لتقديم حلول مبتكرة
                  تناسب مختلف القطاعات وتساعد الشركات على النمو والتطور.
                </p>
                <div className="mt-6 border border-[#7E22CE] w-fit px-6 py-2 rounded-full text-[#7E22CE] font-semibold hover:bg-[#7E22CE] hover:text-white transition duration-300 cursor-pointer">
                  اكتشف مشاريعنا
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative col-span-12 lg:col-span-5 flex justify-center">
            <div className="relative w-[90%] lg:w-[85%] rounded-3xl overflow-hidden shadow-xl border-2 border-[#7E22CE]/30 hover:border-[#7E22CE] transition-all duration-500">
              <img
                src={aboutImg}
                alt="aboutImg"
                className="relative z-20 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
