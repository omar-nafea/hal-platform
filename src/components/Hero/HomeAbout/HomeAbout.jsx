import React from "react";

import aboutImg from "../../../assets/images/about-img.png";
import dots from "../../../assets/images/bottom-dots.png";
import bgImg from "../../../assets/images/bg-img.png";
import bgImg2 from "../../../assets/images/bg-img2.png";

export default function HomeAbout() {
  return (
    <div className="py-20 relative">
      <div className="container mx-auto ">
        <div className="grid grid-cols-12 gap-5 p-5 ">
          <div className="content col-span-12 lg:col-span-4 lg:col-start-3">
            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="">
                <span className="block text-lg font-semibold mb-4 text-main">
                  &lt; من نحن &gt;
                </span>
              </div>
              <div className="mainTitle text-center lg:text-end">
                <h2 className="font-bold text-3xl lg:text-4xl mb-8 leading-snug">
                  التكنولوجيا في خدمتك… لنقل عملك إلى مستوى جديد
                </h2>
                <p className="mb-8 text-gray-700 leading-relaxed">
                  نحن شركة تقنية متخصصة في تطوير حلول ذكاء اصطناعي وتقنيات
                  مبتكرة تساعد الشركات على الأتمتة والنمو في عالم رقمي سريع
                  التغير. نعمل مع فريق خبراء لتقديم حلول مخصصة تضمن لك التميز
                  والمنافسة.
                </p>
              </div>
              <div className="btn">
                <span className="w-9 h-9 flex items-center justify-center bg-main2 rounded-full main-text shadow-md">
                  <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                </span>
                <span className="main-text ml-3 font-medium">
                  اعرف المزيد عنا
                </span>
              </div>
            </div>
          </div>
          <div className="relative col-span-12 lg:col-span-5 flex justify-center ">
            <img src={aboutImg} alt="aboutImg" className=" relative z-20" />

            <img
              src={bgImg}
              alt="bgimg"
              className="absolute  lg:-top-6 lg:right-5  lg:-rotate-1 z-10"
            />

            <img
              src={bgImg2}
              alt="bgimg2"
              className="absolute lg:-bottom-6 lg:left-5  lg:-rotate-1 z-10"
            />
          </div>
        </div>
      </div>
      <img
        src={dots}
        alt="dots"
        className="absolute w-full lg:w-[45%] bottom-0 left-0 z-0"
      />
    </div>
  );
}
