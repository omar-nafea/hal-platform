import React from "react";
import aboutImg from "../../../assets/images/about-img.png";
import dots from "../../../assets/images/works dots.png";

export default function WorksSection() {
  return (
    <>
      <section className="bg-[#F6FBFD]">
        <div className="py-20 relative">
          <div className="container mx-auto ">
            <div className="grid grid-cols-12 gap-5 p-5 ">
              <div className="content col-span-12 lg:col-span-5 lg:col-start-3">
                <div className="flex flex-col items-center justify-center lg:items-end">
                  <div className="">
                    <span className="block text-lg font-semibold mb-4 text-main">
                      &lt; أعمالنا &gt;
                    </span>
                  </div>
                  <div className="mainTitle text-center lg:text-end">
                    <h2 className="font-bold text-3xl lg:text-4xl mb-8 leading-snug">
                      أعمالنا تروي قصة نجاح عملائنا
                    </h2>
                    <p className="mb-8 text-gray-700 leading-relaxed">
                      استكشف مجموعة من المشاريع الناجحة التي نفذناها، حيث دمجنا
                      أحدث تقنيات الذكاء الاصطناعي والتحول الرقمي لتقديم حلول
                      مبتكرة تناسب مختلف القطاعات وتساعد الشركات على النمو
                      والتطور
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative col-span-12 lg:col-span-5 flex justify-center ">
                <img src={aboutImg} alt="aboutImg" className=" relative z-20" />
              </div>
            </div>
          </div>
          <img
            src={dots}
            alt="dots"
            className="absolute w-full lg:w-[45%] top-0 left-0 z-0"
          />
        </div>
      </section>
    </>
  );
}
